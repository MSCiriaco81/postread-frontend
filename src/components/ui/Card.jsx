import clsx from 'clsx'
import styles from './Card.module.css'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div className={clsx(styles.card, hover && styles.hover, className)} {...props}>
      {children}
    </div>
  )
}
