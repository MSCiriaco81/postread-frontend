import clsx from 'clsx'
import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  as: Tag = 'button',
  className,
  ...props
}) {
  return (
    <Tag
      className={clsx(
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.full,
        loading && styles.loading,
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden />}
      <span className={loading ? styles.textHidden : ''}>{children}</span>
    </Tag>
  )
}
