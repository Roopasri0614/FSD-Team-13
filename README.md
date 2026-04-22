# TEAM 13 - Student Team Members Management Application

## Project Description
A full-stack MERN (MongoDB, Express, React, Node.js) application built for the "21CSS301T-FULL STACK DEVELOPMENT" course. This project allows users to manage a team directory, providing functionalities to add new student profiles with images and detailed academic/career information, and view them in a professional, modern grid-based UI.

## Technologies Used
- **Frontend**: React.js (Vite), React Router, Axios, CSS (Premium Dark UI)
- **Backend**: Node.js, Express.js, Mongoose, Multer (for image uploads)
- **Database**: MongoDB

## Installation Steps
1. Clone this repository: `git clone <your-repository-url>`
2. Open the project folder in your terminal.
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## How to Run the App
1. **Database:** Ensure MongoDB is running locally on port 27017 (via MongoDB Compass).
2. **Backend:** Open a terminal and start the backend server:
   ```bash
   cd backend
   npm start
   ```
   *(The server will start on `http://localhost:5000`)*
3. **Frontend:** Open a second terminal and start the frontend app:
   ```bash
   cd frontend
   npm run dev
   ```
   *(The application will be available on `http://localhost:5173`)*

## API Endpoints
- **`POST /api/members`**: Add a new team member (handles form data and image uploads).
- **`GET /api/members`**: Fetch a list of all team members.
- **`GET /api/members/:id`**: Fetch detailed information of a specific team member.
- **`DELETE /api/members/:id`**: Remove a team member from the database and delete their uploaded image file.
