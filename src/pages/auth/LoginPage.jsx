import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import styles from './Auth.module.css'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [errors,   setErrors]   = useState({})
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!email)    e.email    = 'Campo obrigatório'
    if (!password) e.password = 'Campo obrigatório'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Email ou senha incorretos'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.decoration}>
        <div className={styles.decorLines} />
        <blockquote className={styles.quote}>
          <span>"Um leitor vive mil vidas antes de morrer."</span>
          <cite>— George R.R. Martin</cite>
        </blockquote>
      </div>

      <div className={styles.panel}>
        <div className={styles.form}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.brandIcon}><BookOpen size={20} /></div>
            <span className={styles.brandName}>Postread</span>
          </div>

          <div className={`${styles.head} animate-fade-up`}>
            <h1 className="heading-1">Bem-vindo de volta.</h1>
            <p className="body text-muted">Continue sua jornada literária.</p>
          </div>

          <form onSubmit={handleSubmit} className={`${styles.fields} animate-fade-up stagger-1`}>
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})) }}
              error={errors.password}
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth loading={loading} size="lg">
              Entrar
            </Button>
          </form>

          <p className={`${styles.switch} animate-fade-up stagger-2`}>
            Novo por aqui?{' '}
            <Link to="/register" className={styles.switchLink}>Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
