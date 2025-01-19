# Document Q&A

This project is a web application that allows users to upload documents, extract content from them, and ask questions about the content. The application uses a React frontend and communicates with a backend server for processing files and answering questions.

---

## Features

- **File Upload:** Upload documents for processing.
- **Content Extraction:** Extract and display the content of the uploaded document.
- **Question Answering:** Ask questions related to the document's content and get answers.
- **User-Friendly Interface:** Simple and intuitive UI.

---

## Technologies Used

### Frontend
- React
- Axios for HTTP requests
- Tailwind - CSS

### Backend
- Node.js
- Express
- Multer for handling file uploads

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system.

### Steps to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Project Name
   ```

2. **Install Dependencies:**
   - Install frontend dependencies:
     ```bash
     cd client
     npm install
     ```
   - Install backend dependencies:
     ```bash
     cd server
     npm install
     ```

3. **Start the Backend Server:**
   ```bash
   cd server
   node index.js
   ```

4. **Start the Frontend Development Server:**
   ```bash
   cd client
   npm start
   ```
5. **OR From Root Directory(Used Concurrently NPM Package)**
   ```bash
     npm run dev
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### POST `/upload`
- **Description:** Uploads a document for processing.
- **Request Body:** `multipart/form-data` containing the file.
- **Response:**
  - `200 OK` with extracted document data.
  - `400 Bad Request` if no file is uploaded.

### POST `/ask`
- **Description:** Submits a question about the uploaded document.
- **Request Body:**
  ```json
  {
    "question": "string",
    "document": "string"
  }
  ```
- **Response:**
  - `200 OK` with the answer to the question.
  - `400 Bad Request` if required fields are missing.

---

## Project Structure

```plaintext
project-root
├── client
│   ├── public
│   ├── src
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── server
│   ├── uploads
│   ├── index.js
│   └── package.json
└── README.md
```

---


## Screenshots

![App Screenshot](https://i.ibb.co/mRQtMZn/Screenshot-2025-01-19-140540.png)

![App Screenshot](https://i.ibb.co/y6rYBDG/Screenshot-2025-01-19-145330.png)


---

## Known Issues
- Error handling for large files or unsupported formats needs improvement.
- The backend currently supports only text-based documents.

---

## Future Improvements
- Add support for multiple file formats (PDF, Word, etc.).
- Enhance the question-answering logic with advanced NLP models.
- Implement authentication and user-specific data storage.

---

## License
This project is open-source and available under the MIT License.

---

## Contributors
Shanu Kumar Gupta(https://github.com/shanugupta7999/DriveX-AI-Powered-Q-A)

Feel free to contribute to this project by submitting issues or pull requests!

