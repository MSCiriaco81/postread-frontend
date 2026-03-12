import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import styles from './Auth.module.css'

export default function RegisterPage() {
  const [form,    setForm]    = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState({})
  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.username || form.username.length < 3) e.username = 'Mínimo 3 caracteres'
    if (!form.email)                                  e.email    = 'Campo obrigatório'
    if (!form.password || form.password.length < 8)   e.password = 'Mínimo 8 caracteres'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      await register(form.username, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      const detail = err?.response?.data?.detail || 'Erro ao criar conta'
      toast.error(detail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.decoration}>
        <div className={styles.decorLines} />
        <blockquote className={styles.quote}>
          <span>"Livros são espelhos: você só vê neles o que já carrega dentro de si."</span>
          <cite>— Carlos Ruiz Zafón</cite>
        </blockquote>
      </div>

      <div className={styles.panel}>
        <div className={styles.form}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}><BookOpen size={20} /></div>
            <span className={styles.brandName}>Postread</span>
          </div>

          <div className={`${styles.head} animate-fade-up`}>
            <h1 className="heading-1">Crie sua conta.</h1>
            <p className="body text-muted">Junte-se a leitores do mundo todo.</p>
          </div>

          <form onSubmit={handleSubmit} className={`${styles.fields} animate-fade-up stagger-1`}>
            <Input
              label="Nome de usuário"
              placeholder="leitor_apaixonado"
              value={form.username}
              onChange={set('username')}
              error={errors.username}
              autoComplete="username"
            />
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Senha"
              type="password"
              placeholder="mínimo 8 caracteres"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              autoComplete="new-password"
            />
            <Button type="submit" fullWidth loading={loading} size="lg">
              Criar conta
            </Button>
          </form>

          <p className={`${styles.switch} animate-fade-up stagger-2`}>
            Já tem conta?{' '}
            <Link to="/login" className={styles.switchLink}>Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
