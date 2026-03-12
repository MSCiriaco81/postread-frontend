import { useState, useCallback } from 'react'
import { Search, Plus, BookOpen } from 'lucide-react'
import { booksApi } from '../../api'
import { useFetch } from '../../hooks/useFetch'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Skeleton from '../../components/ui/Skeleton'
import styles from './BooksPage.module.css'

export default function BooksPage() {
  const [query,      setQuery]      = useState('')
  const [submitted,  setSubmitted]  = useState('')
  const [showModal,  setShowModal]  = useState(false)

  const { data, loading, refetch } = useFetch(
    () => booksApi.search(submitted, 0, 20),
    [submitted]
  )

  const books = data?.content ?? []

  return (
    <div className={styles.page}>
      <header className={`${styles.header} animate-fade-up`}>
        <div className={styles.rule} />
        <div className={styles.titleRow}>
          <h1 className="heading-1">Explorar livros</h1>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Adicionar
          </Button>
        </div>
      </header>

      {/* Search bar */}
      <div className={`${styles.searchBar} animate-fade-up stagger-1`}>
        <Search size={18} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Buscar por título ou autor..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setSubmitted(query)}
        />
        <Button size="sm" onClick={() => setSubmitted(query)}>Buscar</Button>
      </div>

      {/* Results */}
      <div className={`${styles.grid} animate-fade-up stagger-2`}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <BookSkeleton key={i} />)
          : books.length
            ? books.map(b => <BookCard key={b.id} book={b} />)
            : submitted
              ? <p className="body-sm text-muted" style={{ gridColumn: '1/-1' }}>Nenhum livro encontrado para "{submitted}".</p>
              : <p className="body-sm text-muted" style={{ gridColumn: '1/-1' }}>Digite algo para buscar livros.</p>
        }
      </div>

      {showModal && (
        <AddBookModal onClose={() => { setShowModal(false); refetch() }} />
      )}
    </div>
  )
}

function BookCard({ book }) {
  return (
    <Card hover className={styles.bookCard}>
      <div className={styles.cover}>
        {book.cover
          ? <img src={book.cover} alt={book.title} className={styles.coverImg} />
          : <div className={styles.coverPlaceholder}><BookOpen size={24} /></div>
        }
      </div>
      <div className={styles.bookInfo}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>{book.author}</p>
        {book.genre && <span className={styles.genre}>{book.genre}</span>}
        {book.pageCount && <span className="caption">{book.pageCount} páginas</span>}
      </div>
    </Card>
  )
}

function BookSkeleton() {
  return (
    <Card className={styles.bookCard}>
      <Skeleton height="140px" className={styles.cover} />
      <div className={styles.bookInfo}>
        <Skeleton height="16px" />
        <Skeleton height="13px" width="70%" />
      </div>
    </Card>
  )
}

function AddBookModal({ onClose }) {
  const [form, setForm]     = useState({ title: '', author: '', genre: '', pageCount: '', isbn: '' })
  const [loading, setLoad]  = useState(false)
  const toast = useToast()

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.author) { toast.error('Título e autor são obrigatórios'); return }
    setLoad(true)
    try {
      await booksApi.create({ ...form, pageCount: form.pageCount ? Number(form.pageCount) : undefined })
      toast.success('Livro adicionado!')
      onClose()
    } catch {
      toast.error('Erro ao adicionar livro')
    } finally { setLoad(false) }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className="heading-2">Adicionar livro</h2>
        <hr className="rule" />
        <form className={styles.modalForm} onSubmit={submit}>
          <div className={styles.row}>
            <FormField label="Título *" value={form.title} onChange={set('title')} />
            <FormField label="Autor *"  value={form.author} onChange={set('author')} />
          </div>
          <div className={styles.row}>
            <FormField label="Gênero"   value={form.genre} onChange={set('genre')} />
            <FormField label="Páginas"  value={form.pageCount} onChange={set('pageCount')} type="number" />
          </div>
          <FormField label="ISBN" value={form.isbn} onChange={set('isbn')} />
          <div className={styles.modalActions}>
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button loading={loading} type="submit">Salvar livro</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, type = 'text' }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'.375rem', flex:1 }}>
      <label style={{ fontSize:'.78rem', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--ink-3)' }}>{label}</label>
      <input
        type={type} value={value} onChange={onChange}
        style={{ padding:'.6rem .875rem', border:'1.5px solid var(--paper-3)', borderRadius:'var(--radius)', fontSize:'.9375rem', outline:'none', background:'var(--paper)', fontFamily:'inherit' }}
      />
    </div>
  )
}
