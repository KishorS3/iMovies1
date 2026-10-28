
# 🎬 iMovies — Movie Ticket Booking System

iMovies is a movie ticket booking web application built with React, TypeScript, Node.js, Express.js, and MongoDB. Users can explore movies, search for titles, create accounts, sign in, and book movie tickets.

## ✨ Features

### Implemented
- 🎬 Movie listing and search
- 🔐 User registration and login
- 🔑 Password hashing with bcrypt
- 🪪 JWT token generation during login
- 📄 Separate Login and Registration pages
- 🧭 Client-side navigation using React Router
- 🎟️ Movie ticket booking form
- 💾 Store bookings in MongoDB
- 📱 Responsive, dark-themed user interface
- 🚪 Logout functionality

### Planned Improvements
- Server-side JWT verification for protected booking APIs
- Movie seat selection and availability
- Booking history and cancellation
- Admin dashboard for managing movies and showtimes
- Online payment gateway integration

## 🛠️ Technologies Used

### Frontend
- React
- TypeScript
- Vite
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- CORS

## 📁 Project Structure

```text
iMovies/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── style.css
│   ├── package.json
│   └── index.html
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)
- A code editor such as Visual Studio Code

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KishorS3/iMovies1.git
cd iMovies
```

If you already have the project on your computer, open your existing project folder instead.

### 2. Install Backend Dependencies

Open a terminal in the project root:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/imovies
PORT=5000
JWT_SECRET=replace_with_a_long_random_secret
```

Use a strong, private JWT secret. Never commit your `.env` file or publish your secret to GitHub.

### 4. Install Frontend Dependencies

Open a terminal and run:

```bash
cd client
npm install
```

On Windows PowerShell, if `npm` is blocked by the execution policy, use:

```powershell
npm.cmd install
```

## ▶️ Running the Application

Run the backend and frontend in two separate terminals.

### Terminal 1 — Backend

From the project root:

```powershell
cd D:\iMovies
node server.js
```

Backend URL:

`http://localhost:5000`

### Terminal 2 — Frontend

```powershell
cd D:\iMovies\client
npm.cmd run dev
```

Open the URL displayed by Vite, usually:

`http://localhost:5173`

Make sure MongoDB is running before starting the backend.

## 🔗 Application Pages

| Page | URL |
|---|---|
| Home | `http://localhost:5173/` |
| Login | `http://localhost:5173/login` |
| Register | `http://localhost:5173/register` |

## 🔌 API Endpoints

The backend runs at `http://localhost:5000`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/movies` | Retrieve movies |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/bookings` | Create a ticket booking |

**Security note:** JWT tokens are generated during login, and the frontend checks whether a user is signed in before allowing a booking attempt. Server-side JWT verification must be implemented on the booking endpoint before it can be considered protected.

## 🗄️ Database

The project uses MongoDB with Mongoose.

Default database:

`imovies`

The application stores user accounts and ticket booking records in MongoDB. User passwords are hashed before storage.

## 🔒 Security Notes

- Keep `.env` private.
- Use a strong JWT secret.
- Never store plain-text passwords.
- Validate all user input on the backend.
- Protect booking endpoints with server-side JWT verification.
- Restrict administrative privileges to authorized users.
- Use HTTPS and appropriate security settings before public deployment.

## 🧪 Testing

1. Start MongoDB.
2. Start the backend.
3. Start the frontend.
4. Open the homepage.
5. Register a new account.
6. Sign in using the registered credentials.
7. Search for movies.
8. Submit a ticket booking and verify the result in MongoDB.

## 🔮 Future Scope

Future development may include interactive seat selection, theatre and showtime management, booking history, cancellation and refunds, an admin dashboard, and payment gateway integration.

## 👨‍💻 Author

**Kishor Sakunde**

GitHub: [KishorS3](https://github.com/KishorS3)

## 📄 License

This project is intended for learning and educational purposes. Add a formal license if you plan to distribute it publicly.
