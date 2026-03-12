import { NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, Home, Users, Flame, Search, LogOut, User, PlusCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import styles from './Sidebar.module.css'

const NAV = [
  { to: '/dashboard', icon: Home,     label: 'Início' },
  { to: '/books',     icon: Search,   label: 'Explorar' },
  { to: '/readings',  icon: BookOpen, label: 'Leituras' },
  { to: '/streaks',   icon: Flame,    label: 'Streaks' },
  { to: '/friends',   icon: Users,    label: 'Amigos' },
  { to: '/profile',   icon: User,     label: 'Perfil' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}><BookOpen size={18} /></span>
        <span className={styles.logoText}>Postread</span>
      </div>

      {/* User chip */}
      <div className={styles.user}>
        <div className={styles.avatar}>
          {user?.username?.[0]?.toUpperCase() ?? '?'}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.username}</span>
          <span className={styles.userSub}>leitor</span>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Navigation */}
      <nav className={styles.nav}>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        <NavLink to="/readings/new" className={styles.logBtn}>
          <PlusCircle size={15} />
          Registrar leitura
        </NavLink>
        <button className={styles.logout} onClick={handleLogout}>
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </aside>
  )
}
