import { useState } from 'react'
import { Flame, Plus, Users, Check } from 'lucide-react'
import { streaksApi, socialApi } from '../../api'
import { useFetch } from '../../hooks/useFetch'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Skeleton from '../../components/ui/Skeleton'
import styles from './StreaksPage.module.css'

const GOAL_LABELS = {
  CONSECUTIVE_DAYS: 'dias seguidos',
  TOTAL_MINUTES:    'minutos totais',
  TOTAL_PAGES:      'páginas totais',
}

export default function StreaksPage() {
  const [showModal, setShowModal] = useState(false)
  const { data: streaks, loading, refetch } = useFetch(() => streaksApi.list())
  const toast = useToast()

  const handleCheckIn = async (id) => {
    try {
      await streaksApi.checkIn(id, 30)
      toast.success('Check-in realizado! 🔥')
      refetch()
    } catch { toast.error('Erro no check-in') }
  }

  return (
    <div className={styles.page}>
      <header className={`${styles.header} animate-fade-up`}>
        <div className={styles.rule} />
        <div className={styles.titleRow}>
          <h1 className="heading-1">Streaks</h1>
          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Novo streak
          </Button>
        </div>
        <p className="body-sm text-muted">Desafios de leitura individuais e em grupo.</p>
      </header>

      <div className={`${styles.list} animate-fade-up stagger-1`}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className={styles.streakCard}>
                <Skeleton height="20px" width="60%" />
                <Skeleton height="14px" width="40%" />
              </Card>
            ))
          : streaks?.length
            ? streaks.map(s => (
                <StreakCard key={s.id} streak={s} onCheckIn={() => handleCheckIn(s.id)} />
              ))
            : (
                <div className={styles.empty}>
                  <Flame size={40} strokeWidth={1.5} style={{ color: 'var(--ink-4)' }} />
                  <p className="heading-3 text-muted">Nenhum streak ativo.</p>
                  <p className="body-sm text-faint">Crie um desafio e convide seus amigos!</p>
                  <Button onClick={() => setShowModal(true)} style={{ marginTop: '1rem' }}>Criar streak</Button>
                </div>
              )
        }
      </div>

      {showModal && <CreateStreakModal onClose={() => { setShowModal(false); refetch() }} />}
    </div>
  )
}

function StreakCard({ streak, onCheckIn }) {
  const pct = Math.min((streak.currentStreak / streak.goalValue) * 100, 100)
  const done = streak.status === 'COMPLETED'
  const broken = streak.status === 'BROKEN'

  return (
    <Card className={`${styles.streakCard} ${done ? styles.done : broken ? styles.broken : ''}`}>
      <div className={styles.streakTop}>
        <div className={styles.streakInfo}>
          <h3 className={styles.streakTitle}>{streak.title}</h3>
          <p className="caption">
            {streak.currentStreak} / {streak.goalValue} {GOAL_LABELS[streak.goalType]}
          </p>
        </div>
        <div className={styles.streakMeta}>
          {streak.participantIds?.length > 1 && (
            <span className={styles.group}><Users size={13} /> {streak.participantIds.length}</span>
          )}
          <span className={`${styles.badge} ${styles[streak.status?.toLowerCase()]}`}>
            {streak.status}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${pct}%` }} />
      </div>

      <div className={styles.streakBottom}>
        <div className={styles.fire}>
          <Flame size={16} />
          <span className={styles.streak}>{streak.currentStreak}</span>
          {streak.bestStreak > 0 && (
            <span className="caption">melhor: {streak.bestStreak}</span>
          )}
        </div>
        {streak.status === 'ACTIVE' && (
          <Button size="sm" variant="secondary" onClick={onCheckIn}>
            <Check size={13} /> Check-in
          </Button>
        )}
      </div>
    </Card>
  )
}

function CreateStreakModal({ onClose }) {
  const [form, setForm]    = useState({ title: '', goalType: 'CONSECUTIVE_DAYS', goalValue: 7, participantIds: '' })
  const [loading, setLoad] = useState(false)
  const { data: friends }  = useFetch(() => socialApi.getFriends())
  const toast = useToast()

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title) { toast.error('Título é obrigatório'); return }
    setLoad(true)
    try {
      const participantIds = form.participantIds
        .split(',').map(s => s.trim()).filter(Boolean)
      await streaksApi.create({
        title: form.title,
        goalType: form.goalType,
        goalValue: Number(form.goalValue),
        participantIds,
      })
      toast.success('Streak criado!')
      onClose()
    } catch { toast.error('Erro ao criar streak') } finally { setLoad(false) }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className="heading-2">Criar streak</h2>
        <hr className="rule" />
        <form className={styles.modalForm} onSubmit={submit}>
          <Field label="Título do desafio" value={form.title} onChange={set('title')} placeholder='Ex: "30 dias de leitura"' />
          <div style={{ display:'flex', gap:'1rem' }}>
            <div style={{ flex:1 }}>
              <label className={styles.label}>Tipo de meta</label>
              <select className={styles.input} value={form.goalType} onChange={set('goalType')}>
                <option value="CONSECUTIVE_DAYS">Dias consecutivos</option>
                <option value="TOTAL_MINUTES">Total de minutos</option>
                <option value="TOTAL_PAGES">Total de páginas</option>
              </select>
            </div>
            <Field label="Meta" type="number" min="1" value={form.goalValue} onChange={set('goalValue')} style={{ flex:1 }} />
          </div>
          {friends?.length > 0 && (
            <div>
              <label className={styles.label}>Convidar amigos (IDs separados por vírgula)</label>
              <input className={styles.input} value={form.participantIds} onChange={set('participantIds')} placeholder="id1, id2..." />
              <div className={styles.friendChips}>
                {friends.map(f => (
                  <button key={f.id} type="button" className={styles.friendChip}
                    onClick={() => setForm(p => ({ ...p, participantIds: p.participantIds ? `${p.participantIds}, ${f.id}` : f.id }))}>
                    {f.username}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button loading={loading} type="submit">Criar streak</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, style, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'.375rem', ...style }}>
      <label style={{ fontSize:'.78rem', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--ink-3)' }}>{label}</label>
      <input style={{ padding:'.6rem .875rem', border:'1.5px solid var(--paper-3)', borderRadius:'var(--radius)', fontSize:'.9375rem', outline:'none', background:'var(--paper)', fontFamily:'inherit' }} {...props} />
    </div>
  )
}
