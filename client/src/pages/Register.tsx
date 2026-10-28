
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = 'http://localhost:5000'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Registration failed.')

      navigate('/login', {
        state: { message: 'Account created successfully. Please sign in.' },
      })
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Registration failed.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Link className="auth-brand" to="/">🎬 iMovies</Link>
        <p className="auth-eyebrow">JOIN THE EXPERIENCE</p>
        <h1>Create your account</h1>
        <p className="auth-subtitle">Your next favourite movie awaits.</p>

        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label htmlFor="register-email">Email address</label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={72}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />

        {message && <p className="auth-message" role="alert">{message}</p>}

        <button className="auth-submit" disabled={loading} type="submit">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
        <Link className="auth-home" to="/">← Back to movies</Link>
      </form>
    </main>
  )
}
