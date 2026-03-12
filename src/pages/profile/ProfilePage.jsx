import { useState } from 'react'
import { Edit2, Save, X } from 'lucide-react'
import { usersApi } from '../../api'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/ui/Toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Skeleton, { SkeletonText } from '../../components/ui/Skeleton'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { user: authUser } = useAuth()
  const toast = useToast()
  const { data: profile, loading, refetch } = useFetch(() => usersApi.me())

  const [editing,   setEditing]   = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [bio,       setBio]       = useState('')
  const [photoUrl,  setPhotoUrl]  = useState('')

  const startEdit = () => {
    setBio(profile?.bio ?? '')
    setPhotoUrl(profile?.profilePicture ?? '')
    setEditing(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      await usersApi.updateProfile({ bio: bio || undefined, profilePicture: photoUrl || undefined })
      toast.success('Perfil atualizado!')
      setEditing(false)
      refetch()
    } catch { toast.error('Erro ao salvar') } finally { setSaving(false) }
  }

  if (loading) return <ProfileSkeleton />

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={`${styles.hero} animate-fade-up`}>
        <div className={styles.heroAccent} />
        <div className={styles.heroContent}>
          <div className={styles.avatarWrap}>
            {profile?.profilePicture
              ? <img src={profile.profilePicture} alt="avatar" className={styles.avatarImg} />
              : <div className={styles.avatar}>{profile?.username?.[0]?.toUpperCase()}</div>
            }
          </div>
          <div className={styles.heroText}>
            <h1 className="heading-1">{profile?.username}</h1>
            <p className="body text-muted">{profile?.email}</p>
            {profile?.bio && <p className={styles.bio}>{profile.bio}</p>}
            <p className="caption">Membro desde {profile?.createdAt ? new Date(profile.createdAt).getFullYear() : '—'}</p>
          </div>
          {!editing && (
            <Button variant="secondary" size="sm" onClick={startEdit} className={styles.editBtn}>
              <Edit2 size={14} /> Editar perfil
            </Button>
          )}
        </div>
      </div>

      {/* Edit form */}
      {editing && (
        <Card className={`${styles.editCard} animate-fade-up`}>
          <h3 className="heading-3">Editar perfil</h3>
          <hr className="rule" />
          <div className={styles.editFields}>
            <div className={styles.editField}>
              <label className={styles.label}>Bio</label>
              <textarea
                className={styles.input}
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você e seus gostos literários..."
                rows={3}
              />
            </div>
            <div className={styles.editField}>
              <label className={styles.label}>URL da foto de perfil</label>
              <input
                className={styles.input}
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className={styles.editActions}>
            <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>
              <X size={14} /> Cancelar
            </Button>
            <Button size="sm" loading={saving} onClick={save}>
              <Save size={14} /> Salvar alterações
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className={styles.page}>
      <Card className={styles.hero}>
        <div style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
          <Skeleton circle width="80px" height="80px" />
          <div style={{ flex:1 }}><SkeletonText lines={3} /></div>
        </div>
      </Card>
    </div>
  )
}
