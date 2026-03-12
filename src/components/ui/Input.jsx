import clsx from 'clsx'
import styles from './Input.module.css'

export default function Input({ label, error, hint, className, ...props }) {
  return (
    <div className={clsx(styles.field, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={clsx(styles.input, error && styles.hasError)} {...props} />
      {error && <span className={styles.error}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}

export function Textarea({ label, error, hint, className, ...props }) {
  return (
    <div className={clsx(styles.field, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={clsx(styles.input, styles.textarea, error && styles.hasError)} {...props} />
      {error && <span className={styles.error}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}
