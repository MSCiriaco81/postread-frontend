import { BookOpen, Flame, Users, Clock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { feedApi, readingApi, streaksApi } from '../../api'
import { useFetch } from '../../hooks/useFetch'
import Card from '../../components/ui/Card'
import Skeleton from '../../components/ui/Skeleton'
import FeedItem from '../../components/feed/FeedItem'
import styles from './Dashboard.module.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: feed,     loading: feedLoading }    = useFetch(() => feedApi.list(0, 10))
  const { data: readings, loading: readLoading }    = useFetch(() => readingApi.list(0, 5))
  const { data: streaks,  loading: streakLoading }  = useFetch(() => streaksApi.list())

  const totalMinutes = readings?.content?.reduce((s, r) => s + (r.minutesRead || 0), 0) ?? 0
  const totalPages   = readings?.content?.reduce((s, r) => s + (r.pagesRead   || 0), 0) ?? 0
  const activeStreaks = streaks?.filter(s => s.status === 'ACTIVE').length ?? 0

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={`${styles.header} animate-fade-up`}>
        <div className={styles.rule} />
        <h1 className="heading-1">
          Olá, <em>{user?.username}</em>.
        </h1>
        <p className="body text-muted">O que você leu hoje?</p>
      </header>

      {/* Stats row */}
      <div className={`${styles.stats} animate-fade-up stagger-1`}>
        <StatCard icon={<Clock size={18} />} label="Minutos (recentes)" value={`${totalMinutes}min`} loading={readLoading} />
        <StatCard icon={<BookOpen size={18} />} label="Páginas (recentes)" value={`${totalPages}p`}   loading={readLoading} />
        <StatCard icon={<Flame size={18} />} label="Streaks ativos"     value={activeStreaks}          loading={streakLoading} color="warm" />
      </div>

      <div className={styles.cols}>
        {/* Feed */}
        <section className={`${styles.feedSection} animate-fade-up stagger-2`}>
          <h2 className={`heading-2 ${styles.sectionTitle}`}>
            <span>Feed</span>
            <span className="caption">amigos</span>
          </h2>
          <hr className="rule" />
          {feedLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.feedSkeleton}>
                  <Skeleton circle width="36px" height="36px" />
                  <div style={{ flex:1 }}><Skeleton height="14px" /><Skeleton height="11px" width="60%" className="stagger-1" /></div>
                </div>
              ))
            : feed?.content?.length
              ? feed.content.map(ev => <FeedItem key={ev.id} event={ev} />)
              : <p className="body-sm text-muted" style={{ padding: '1rem 0' }}>Nenhuma atividade ainda. Adicione amigos!</p>
          }
        </section>

        {/* Recent reads */}
        <section className={`${styles.recentSection} animate-fade-up stagger-3`}>
          <h2 className={`heading-2 ${styles.sectionTitle}`}>
            <span>Recentes</span>
            <span className="caption">leituras</span>
          </h2>
          <hr className="rule" />
          {readLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={styles.readingSkeleton}>
                  <Skeleton height="16px" /><Skeleton height="11px" width="50%" />
                </div>
              ))
            : readings?.content?.length
              ? readings.content.slice(0, 5).map(r => (
                  <ReadingRow key={r.id} entry={r} />
                ))
              : <p className="body-sm text-muted" style={{ padding: '1rem 0' }}>Nenhuma leitura registrada.</p>
          }
        </section>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, loading, color }) {
  return (
    <Card className={`${styles.statCard} ${color === 'warm' ? styles.warm : ''}`}>
      <div className={styles.statIcon}>{icon}</div>
      {loading
        ? <Skeleton height="28px" width="60px" />
        : <span className={styles.statValue}>{value}</span>
      }
      <span className="caption">{label}</span>
    </Card>
  )
}

function ReadingRow({ entry }) {
  return (
    <div className={styles.readingRow}>
      <div className={styles.readingDot} />
      <div>
        <p className="body-sm" style={{ fontWeight: 500 }}>{entry.bookId}</p>
        <p className="caption">{entry.date} · {entry.minutesRead ?? 0}min · {entry.pagesRead ?? 0}p</p>
      </div>
      {entry.rating && (
        <span className={styles.rating}>{'★'.repeat(entry.rating)}</span>
      )}
    </div>
  )
}
