import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/autenticacion'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)
    if (result && result.success) {
      navigate('/home')
    } else {
      setError(result?.error || 'Error al iniciar sesión')
    }

    setLoading(false)
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)'}}>
      <div className="card border-0 shadow-lg p-5" style={{width: '100%', maxWidth: '450px', borderRadius: '15px'}}>
        <h1 className="text-center mb-2" style={{color: '#1e7e34', fontSize: '32px', fontWeight: '700'}}>
          Cultura App
        </h1>
        <p className="text-center text-muted mb-4" style={{fontSize: '14px'}}>
          Inicia sesión en tu cuenta
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{color: '#1e7e34', fontWeight: '600'}}>
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{borderColor: '#e0e0e0', borderWidth: '2px'}}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{color: '#1e7e34', fontWeight: '600'}}>
              Contraseña
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{borderColor: '#e0e0e0', borderWidth: '2px'}}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
            />
            <label className="form-check-label" htmlFor="remember">
              Recuérdame
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 btn-lg fw-bold"
            style={{background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)', border: 'none'}}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center mt-4" style={{fontSize: '14px'}}>
          ¿No tienes cuenta? <a href="#signup" style={{color: '#2d9e4e', fontWeight: '600', textDecoration: 'none'}}>Regístrate aquí</a>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
        Usuario demo: usuario@test.com / 123456
      </p>
      </div>
    </div>
  )
}
