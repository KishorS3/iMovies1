
import { useEffect, useState } from 'react'

type Movie = {
  id: number
  title: string
  genre: string
  rating: number
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  const [tickets, setTickets] = useState(1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data))
      .catch(() => setMessage('Cannot load movies. Check the backend.'))
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  async function bookMovie(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, movieTitle, tickets }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed.')
      }

      setMessage('Booking successful! Your booking has been saved.')
      setCustomerName('')
      setTickets(1)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Booking failed.')
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>🎬 iMovies</h1>
        <nav>
          <a href="#home">Home</a>{' '}
          <a href="#movies">Movies</a>{' '}
          <a href="#booking">Book Tickets</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="tagline">YOUR MOVIE. YOUR MOMENT.</p>
          <h2>Discover Movies<br />You’ll Love.</h2>
          <p>Find your next favourite movie.</p>
          <a className="explore-btn" href="#movies">Explore Movies</a>
        </section>

        <section className="movies" id="movies">
          <h2>Popular Movies</h2>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="poster">🎬</div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>
                  <p>⭐ {movie.rating}</p>
                  <button
                    onClick={() => {
                      setMovieTitle(movie.title)
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>

          {movies.length === 0 && <p>Loading movies...</p>}
          {movies.length > 0 && filteredMovies.length === 0 && <p>No movies found.</p>}
        </section>

        <section className="movies" id="booking">
          <h2>Book Your Tickets</h2>
          <form onSubmit={bookMovie} className="booking-form">
            <label>
              Your Name
              <input
                required
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your name"
              />
            </label>

            <label>
              Select Movie
              <select
                required
                value={movieTitle}
                onChange={(event) => setMovieTitle(event.target.value)}
              >
                <option value="">Choose a movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.title}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Number of Tickets
              <input
                type="number"
                min="1"
                max="10"
                required
                value={tickets}
                onChange={(event) => setTickets(Number(event.target.value))}
              />
            </label>

            <button type="submit">Confirm Booking</button>
          </form>

          {message && <p role="status">{message}</p>}
        </section>
      </main>

      <footer>© 2026 iMovies</footer>
    </div>
  )
}
