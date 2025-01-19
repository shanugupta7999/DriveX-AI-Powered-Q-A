import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [documentData, setDocumentData] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post('https://drive-x-ai.onrender.com/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setDocumentData(JSON.stringify(response.data.data, null, 2)); // Pretty print JSON
        alert("File uploaded successfully.");
      } else {
        alert("Failed to process the file.");
      }
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert(error.response?.data?.message || "An error occurred while uploading the file.");
    }
  };

  const handleAskQuestion = async () => {
    if (!question || !documentData) return alert("Provide a question and upload a document.");

    try {
      const response = await axios.post('https://drive-x-ai.onrender.com/ask', {
        question,
        document: documentData,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Question error:", error.response || error);
      alert(error.response?.data?.message || "Failed to fetch an answer.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Document Q&A</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Upload
          </button>
        </div>

        <textarea
          placeholder="Document data will appear here after upload."
          value={documentData}
          readOnly
          rows="10"
          className="w-full border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Type your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAskQuestion}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Ask
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Answer:</h3>
          <p className="mt-2 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-300">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
