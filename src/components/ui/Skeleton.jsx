import clsx from 'clsx'
import styles from './Skeleton.module.css'

export default function Skeleton({ width, height, className, circle }) {
  return (
    <span
      className={clsx(styles.skeleton, circle && styles.circle, className)}
      style={{ width, height }}
      aria-hidden
    />
  )
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className={styles.group}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height="14px" width={i === lines - 1 ? '65%' : '100%'} />
      ))}
    </div>
  )
}
