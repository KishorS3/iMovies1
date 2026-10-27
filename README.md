# 🎬 iMovies — Movie Booking System

## About the Project

iMovies is a movie browsing and ticket booking web application built using the MERN stack. It allows users to explore popular movies, search by title, view movie genres and ratings, and book tickets through a simple user interface.

The application uses React and TypeScript for the frontend, Node.js and Express.js for the backend, and MongoDB to store booking information.

## Features

- Browse popular movies
- Search movies by title
- View movie genres and ratings
- Select a movie for booking
- Enter customer details and ticket quantity
- Save bookings in MongoDB
- REST API integration between frontend and backend

## Technologies Used

- **Frontend:** React, TypeScript, HTML, CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Other tools:** Git, GitHub, VS Code

## Project Structure

```text
iMovies/
├── client/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── style.css
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## Requirements

- Node.js and npm
- MongoDB installed and running
- Git (optional, for version control)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KishorS3/iMovies.git
cd iMovies
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/imovies
PORT=5000
```

Do not upload your `.env` file or database credentials to GitHub.

### 4. Start the Backend

```bash
node server.js
```

The backend runs at `http://localhost:5000`.

### 5. Start the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/api/movies` | Retrieve the movie list |
| POST | `/api/bookings` | Create a ticket booking |

## Current Project Scope

The current implementation supports movie browsing, title search, and basic ticket booking with MongoDB persistence. Authentication, online payments, theatre/showtime management, and real-time seat availability are potential future enhancements.

## Future Enhancements

- User registration and login
- Admin dashboard
- Theatre and showtime management
- Seat selection and availability tracking
- Booking history and cancellation
- Online payment integration

## Author

**KishorS3**

GitHub: https://github.com/KishorS3
