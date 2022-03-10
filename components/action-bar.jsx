import joinClassNames from 'classnames'
import styles from '@/styles/action-bar.module.css'

const ActionBar = ({ onEdit, onDelete, className, ...htmlAttrs }) => (
  <ul className={joinClassNames(styles.container, className)} {...htmlAttrs}>
    <li>
      <button
        className={styles.edit}
        onClick={onEdit}
      >
          Рудагувати
        </button>
    </li>

    <li>
      <button
        className={styles.delete}
        onClick={onDelete}
      >
          Видалити
        </button>
    </li>
  </ul>
)

export default ActionBar
