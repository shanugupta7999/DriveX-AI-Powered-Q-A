const express = require("express");
const multer = require("multer");
const cors = require("cors");
const xlsx = require("xlsx");
const { OpenAI } = require("openai"); 
const fs = require("fs");
const exp = require("constants");
const path = require("path");
require("dotenv").config(); 

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.mimetype.includes("excel")) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a valid Excel file." });
    }

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet); 

    
    fs.unlinkSync(file.path);

    
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to process the file." });
  }
});

app.post("/ask", async (req, res) => {
  try {
    const { question, document } = req.body; 
    const prompt = `Here is the document: ${document}\n\nQuestion: ${question}\n\nAnswer:`;

    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    
    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate an answer." });
  }
});

app.get("/", (req, res) => {
  res.send("backend is running here");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
