
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = 'http://localhost:5000'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Login failed.')

      sessionStorage.setItem('imoviesToken', data.token)
      sessionStorage.setItem('imoviesUser', JSON.stringify(data.user))
      navigate('/')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Link className="auth-brand" to="/">🎬 iMovies</Link>
        <p className="auth-eyebrow">WELCOME BACK</p>
        <h1>Sign in to iMovies</h1>
        <p className="auth-subtitle">Log in to continue your movie journey.</p>

        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {message && <p className="auth-message" role="alert">{message}</p>}

        <button className="auth-submit" disabled={loading} type="submit">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
        <Link className="auth-home" to="/">← Back to movies</Link>
      </form>
    </main>
  )
}
