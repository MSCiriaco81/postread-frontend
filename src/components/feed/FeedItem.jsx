import { BookOpen, Flame, UserPlus, TrendingUp, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import styles from './FeedItem.module.css'

const TYPE_MAP = {
  READING_LOGGED:    { icon: BookOpen,    color: 'green',  text: (p) => `registrou uma leitura — ${p.minutes ?? 0} minutos` },
  STREAK_MAINTAINED: { icon: Flame,       color: 'warm',   text: () => 'manteve o streak hoje 🔥' },
  STREAK_BROKEN:     { icon: AlertCircle, color: 'accent', text: () => 'quebrou o streak 😔' },
  STREAK_STARTED:    { icon: Flame,       color: 'warm',   text: () => 'iniciou um novo streak' },
  FRIENDSHIP_STARTED:{ icon: UserPlus,    color: 'ink',    text: () => 'fez um novo amigo' },
  BOOK_ADDED:        { icon: BookOpen,    color: 'green',  text: () => 'adicionou um novo livro' },
}

export default function FeedItem({ event }) {
  const cfg = TYPE_MAP[event.eventType] ?? { icon: TrendingUp, color: 'ink', text: () => event.eventType }
  const Icon = cfg.icon

  const timeAgo = event.createdAt
    ? formatDistanceToNow(new Date(event.createdAt), { addSuffix: true, locale: ptBR })
    : ''

  return (
    <div className={styles.item}>
      <div className={`${styles.icon} ${styles[cfg.color]}`}>
        <Icon size={14} />
      </div>
      <div className={styles.body}>
        <p className={styles.text}>
          <strong>{event.actorUserId}</strong>{' '}
          {cfg.text(event.payload ?? {})}
        </p>
        {timeAgo && <span className="caption">{timeAgo}</span>}
      </div>
    </div>
  )
}
