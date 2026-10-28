
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

type Movie = {
  id: number
  title: string
  genre: string
  rating: number
}

type User = {
  name: string
  email: string
  role: string
}

const API = 'http://localhost:5000'

function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  const [tickets, setTickets] = useState(1)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = sessionStorage.getItem('imoviesUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User)
      } catch {
        sessionStorage.removeItem('imoviesUser')
      }
    }

    fetch(`${API}/api/movies`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load movies.')
        return res.json()
      })
      .then((data: Movie[]) => setMovies(data))
      .catch(() => setMessage('Cannot load movies. Check the backend.'))
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  function logout() {
    sessionStorage.removeItem('imoviesToken')
    sessionStorage.removeItem('imoviesUser')
    setUser(null)
    setMessage('You have been logged out.')
  }

  async function bookMovie(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (!user) {
      setMessage('Please sign in before booking tickets.')
      return
    }

    const token = sessionStorage.getItem('imoviesToken')

    try {
      const response = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ customerName, movieTitle, tickets }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Booking failed.')

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
        <Link className="brand" to="/">🎬 iMovies</Link>

        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#booking">Book Tickets</a>
        </nav>

        <div className="nav-account">
          {user ? (
            <>
              <span className="welcome-user">Hi, {user.name}</span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">Sign In</Link>
              <Link className="register-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="tagline">YOUR MOVIE. YOUR MOMENT.</p>
          <h2>Discover Movies<br />You’ll Love.</h2>
          <p>Find your next favourite movie.</p>
          <a className="explore-btn" href="#movies">Explore Movies</a>
        </section>

        <section className="movies" id="movies">
          <div className="section-heading">
            <div>
              <p className="section-kicker">NOW SHOWING</p>
              <h2>Popular Movies</h2>
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="poster"><span>🎬</span></div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>
                  <p className="rating">★ {movie.rating}</p>
                  <button
                    onClick={() => {
                      setMovieTitle(movie.title)
                      document.getElementById('booking')?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>

          {movies.length === 0 && <p className="empty-state">Loading movies...</p>}
          {movies.length > 0 && filteredMovies.length === 0 && (
            <p className="empty-state">No movies found.</p>
          )}
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-intro">
            <p className="section-kicker">MAKE IT A MOVIE NIGHT</p>
            <h2>Book Your Tickets</h2>
            <p>Choose your movie and get ready for the big screen.</p>
            {!user && <p className="signin-note">You’ll need to sign in before booking.</p>}
          </div>

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
                  <option key={movie.id} value={movie.title}>{movie.title}</option>
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

          {message && <p className="status-message" role="status">{message}</p>}
        </section>
      </main>

      <footer>© 2026 iMovies · Your movie. Your moment.</footer>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
