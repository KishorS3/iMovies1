
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`iMovies server running at http://localhost:${PORT}`)
})
