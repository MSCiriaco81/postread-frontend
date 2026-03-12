import { useState } from 'react'
import { Plus, Trash2, Star } from 'lucide-react'
import { readingApi, booksApi } from '../../api'
import { useFetch } from '../../hooks/useFetch'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Skeleton from '../../components/ui/Skeleton'
import styles from './ReadingPage.module.css'

export default function ReadingPage() {
  const [showModal, setShowModal] = useState(false)
  const { data, loading, refetch } = useFetch(() => readingApi.list(0, 30))
  const toast = useToast()

  const entries = data?.content ?? []

  const handleDelete = async (id) => {
    if (!confirm('Remover esta leitura?')) return
    try {
      await readingApi.remove(id)
      toast.success('Leitura removida')
      refetch()
    } catch { toast.error('Erro ao remover') }
  }

  return (
    <div className={styles.page}>
      <header className={`${styles.header} animate-fade-up`}>
        <div className={styles.rule} />
        <div className={styles.titleRow}>
          <h1 className="heading-1">Leituras</h1>
          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Registrar
          </Button>
        </div>
      </header>

      <div className={`${styles.list} animate-fade-up stagger-1`}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className={styles.entry}>
                <Skeleton height="16px" width="40%" />
                <Skeleton height="13px" width="60%" />
              </Card>
            ))
          : entries.length
            ? entries.map(e => (
                <Card key={e.id} className={styles.entry}>
                  <div className={styles.entryMain}>
                    <div className={styles.entryMeta}>
                      <span className="mono caption">{e.date}</span>
                      {e.rating && (
                        <span className={styles.stars}>
                          {Array.from({ length: e.rating }).map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                        </span>
                      )}
                    </div>
                    <p className={styles.bookId}>{e.bookId}</p>
                    <div className={styles.metrics}>
                      {e.minutesRead != null && <Chip label={`${e.minutesRead}min`} />}
                      {e.pagesRead   != null && <Chip label={`${e.pagesRead}p`} />}
                    </div>
                    {e.notes && <p className={styles.notes}>{e.notes}</p>}
                  </div>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(e.id)} title="Remover">
                    <Trash2 size={14} />
                  </button>
                </Card>
              ))
            : (
                <div className={styles.empty}>
                  <p className="heading-3 text-muted">Nenhuma leitura ainda.</p>
                  <p className="body-sm text-faint">Registre sua primeira sessão de leitura!</p>
                  <Button onClick={() => setShowModal(true)} style={{ marginTop: '1rem' }}>Registrar agora</Button>
                </div>
              )
        }
      </div>

      {showModal && <LogReadingModal onClose={() => { setShowModal(false); refetch() }} />}
    </div>
  )
}

function Chip({ label }) {
  return <span className={styles.chip}>{label}</span>
}

function LogReadingModal({ onClose }) {
  const [form, setForm]     = useState({ bookId: '', minutesRead: '', pagesRead: '', rating: '', notes: '', date: new Date().toISOString().slice(0,10) })
  const [books, setBooks]   = useState([])
  const [loading, setLoad]  = useState(false)
  const [searching, setSrch]= useState(false)
  const toast = useToast()

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const searchBooks = async (q) => {
    if (q.length < 2) return
    setSrch(true)
    try { const r = await booksApi.search(q); setBooks(r.content ?? []) }
    finally { setSrch(false) }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.bookId) { toast.error('Selecione um livro'); return }
    setLoad(true)
    try {
      await readingApi.log({
        bookId:     form.bookId,
        minutesRead: form.minutesRead ? Number(form.minutesRead) : null,
        pagesRead:   form.pagesRead   ? Number(form.pagesRead)   : null,
        rating:      form.rating      ? Number(form.rating)      : null,
        notes:       form.notes || null,
        date:        form.date || null,
      })
      toast.success('Leitura registrada!')
      onClose()
    } catch { toast.error('Erro ao registrar') } finally { setLoad(false) }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className="heading-2">Registrar leitura</h2>
        <hr className="rule" />
        <form className={styles.modalForm} onSubmit={submit}>
          {/* Book search */}
          <div>
            <label className={styles.label}>Livro</label>
            <input
              className={styles.input}
              placeholder="Buscar livro..."
              onChange={e => searchBooks(e.target.value)}
            />
            {books.length > 0 && (
              <div className={styles.suggestions}>
                {books.map(b => (
                  <button key={b.id} type="button"
                    className={`${styles.suggestion} ${form.bookId === b.id ? styles.selected : ''}`}
                    onClick={() => { setForm(p => ({...p, bookId: b.id})); setBooks([]) }}
                  >
                    <strong>{b.title}</strong> <span className="text-muted">— {b.author}</span>
                  </button>
                ))}
              </div>
            )}
            {form.bookId && <p className="caption" style={{marginTop:'.25rem', color:'var(--green)'}}>✓ Livro selecionado: {form.bookId}</p>}
          </div>

          <div className={styles.row}>
            <Field label="Minutos lidos"  type="number" value={form.minutesRead} onChange={set('minutesRead')} />
            <Field label="Páginas lidas"  type="number" value={form.pagesRead}   onChange={set('pagesRead')}   />
          </div>
          <div className={styles.row}>
            <Field label="Avaliação (1-5)" type="number" min="1" max="5" value={form.rating} onChange={set('rating')} />
            <Field label="Data" type="date" value={form.date} onChange={set('date')} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.375rem' }}>
            <label className={styles.label}>Notas</label>
            <textarea className={styles.input} style={{ minHeight:80, resize:'vertical' }} value={form.notes} onChange={set('notes')} placeholder="O que você achou?" />
          </div>
          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button loading={loading} type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'.375rem' }}>
      <label style={{ fontSize:'.78rem', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--ink-3)' }}>{label}</label>
      <input style={{ padding:'.6rem .875rem', border:'1.5px solid var(--paper-3)', borderRadius:'var(--radius)', fontSize:'.9375rem', outline:'none', background:'var(--paper)', fontFamily:'inherit' }} {...props} />
    </div>
  )
}
