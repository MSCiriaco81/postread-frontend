import { useState } from 'react'
import { UserPlus, Check, X, Search } from 'lucide-react'
import { socialApi, usersApi } from '../../api'
import { useFetch } from '../../hooks/useFetch'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Skeleton from '../../components/ui/Skeleton'
import styles from './FriendsPage.module.css'

export default function FriendsPage() {
  const toast = useToast()
  const { data: friends,  loading: fl, refetch: rFriends  } = useFetch(() => socialApi.getFriends())
  const { data: pending,  loading: pl, refetch: rPending  } = useFetch(() => socialApi.getPending())

  const [searchId, setSearchId] = useState('')
  const [sending, setSending]   = useState(false)

  const sendRequest = async () => {
    if (!searchId.trim()) return
    setSending(true)
    try {
      await socialApi.sendRequest(searchId.trim())
      toast.success('Solicitação enviada!')
      setSearchId('')
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Erro ao enviar solicitação')
    } finally { setSending(false) }
  }

  const accept = async (id) => {
    try { await socialApi.acceptRequest(id); toast.success('Amigo adicionado!'); rFriends(); rPending() }
    catch { toast.error('Erro') }
  }

  const reject = async (id) => {
    try { await socialApi.rejectRequest(id); rPending() }
    catch { toast.error('Erro') }
  }

  return (
    <div className={styles.page}>
      <header className={`${styles.header} animate-fade-up`}>
        <div className={styles.rule} />
        <h1 className="heading-1">Amigos</h1>
        <p className="body-sm text-muted">Conecte-se com outros leitores.</p>
      </header>

      {/* Add friend */}
      <Card className={`${styles.addCard} animate-fade-up stagger-1`}>
        <h3 className="heading-3">Adicionar amigo</h3>
        <p className="body-sm text-muted">Digite o ID do usuário que deseja adicionar.</p>
        <div className={styles.addRow}>
          <div className={styles.addInput}>
            <Search size={15} className={styles.addIcon} />
            <input
              className={styles.input}
              placeholder="ID do usuário..."
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendRequest()}
            />
          </div>
          <Button loading={sending} onClick={sendRequest} size="sm">
            <UserPlus size={14} /> Enviar pedido
          </Button>
        </div>
      </Card>

      {/* Pending requests */}
      {(pl || pending?.length > 0) && (
        <section className={`animate-fade-up stagger-2`}>
          <h2 className={`heading-2 ${styles.sectionTitle}`}>
            Solicitações pendentes
            {pending?.length > 0 && <span className={styles.badge}>{pending.length}</span>}
          </h2>
          <hr className="rule" />
          <div className={styles.list}>
            {pl
              ? Array.from({ length: 2 }).map((_, i) => <FriendSkeleton key={i} />)
              : pending.map(req => (
                  <Card key={req.id} className={styles.requestCard}>
                    <div className={styles.avatar}>{req.requesterId?.[0]?.toUpperCase()}</div>
                    <div className={styles.info}>
                      <p className="body-sm" style={{ fontWeight: 500 }}>{req.requesterId}</p>
                      <span className="caption">quer ser seu amigo</span>
                    </div>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.accept}`} onClick={() => accept(req.id)} title="Aceitar">
                        <Check size={15} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.reject}`} onClick={() => reject(req.id)} title="Rejeitar">
                        <X size={15} />
                      </button>
                    </div>
                  </Card>
                ))
            }
          </div>
        </section>
      )}

      {/* Friends list */}
      <section className={`animate-fade-up stagger-3`}>
        <h2 className={`heading-2 ${styles.sectionTitle}`}>
          Meus amigos
          {friends?.length > 0 && <span className="caption text-muted">{friends.length}</span>}
        </h2>
        <hr className="rule" />
        <div className={styles.grid}>
          {fl
            ? Array.from({ length: 4 }).map((_, i) => <FriendSkeleton key={i} />)
            : friends?.length
              ? friends.map(f => <FriendCard key={f.id} friend={f} />)
              : <p className="body-sm text-muted">Nenhum amigo ainda. Convide alguém!</p>
          }
        </div>
      </section>
    </div>
  )
}

function FriendCard({ friend }) {
  return (
    <Card hover className={styles.friendCard}>
      <div className={styles.friendAvatar}>{friend.username?.[0]?.toUpperCase()}</div>
      <div>
        <p style={{ fontWeight: 500, fontSize: '.9rem' }}>{friend.username}</p>
        {friend.bio && <p className="caption">{friend.bio}</p>}
      </div>
    </Card>
  )
}

function FriendSkeleton() {
  return (
    <Card className={styles.friendCard}>
      <Skeleton circle width="44px" height="44px" />
      <div style={{ flex: 1 }}><Skeleton height="14px" /><Skeleton height="11px" width="60%" /></div>
    </Card>
  )
}
