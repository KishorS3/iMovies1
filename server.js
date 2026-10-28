
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error.message))

app.get('/', (req, res) => {
  res.send('iMovies API is running!')
})

app.get('/api/movies', (req, res) => {
  res.json([
    { id: 1, title: 'Interstellar', genre: 'Sci-Fi', rating: 8.7 },
    { id: 2, title: 'Inception', genre: 'Thriller', rating: 8.8 },
    { id: 3, title: 'The Dark Knight', genre: 'Action', rating: 9.0 },
    { id: 4, title: 'Dune: Part Two', genre: 'Adventure', rating: 8.5 }
  ])
})

const Booking = mongoose.model('Booking', new mongoose.Schema({
  customerName: { type: String, required: true },
  movieTitle: { type: String, required: true },
  tickets: { type: Number, required: true, min: 1 }
}))

app.post('/api/bookings', async (req, res) => {
  try {
    const { customerName, movieTitle, tickets } = req.body

    if (
      !customerName ||
      !movieTitle ||
      !Number.isInteger(tickets) ||
      tickets < 1 ||
      tickets > 10
    ) {
      return res.status(400).json({
        message: 'Enter valid booking details.'
      })
    }

    const booking = await Booking.create({
      customerName,
      movieTitle,
      tickets
    })

    res.status(201).json({
      message: 'Booking successful!',
      booking
    })
  } catch (error) {
    console.error('Booking error:', error.message)
    res.status(500).json({
      message: 'Could not save booking.'
    })
  }
})

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true }))

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== 'string' ||
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).json({
        message: 'Enter a name, valid email, and password of 8–72 characters.'
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    })

    res.status(201).json({
      message: 'Registration successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      })
    }

    console.error('Registration error:', error.message)
    res.status(500).json({ message: 'Registration failed.' })
  }
})

// Log in
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      password.length > 72
    ) {
      return res.status(400).json({
        message: 'Enter a valid email and password.'
      })
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Incorrect email or password.'
      })
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ message: 'Login failed.' })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`iMovies server running at http://localhost:${PORT}`)
})
