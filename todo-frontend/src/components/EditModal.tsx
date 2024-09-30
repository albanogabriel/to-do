import { X } from 'phosphor-react'
import styles from './EditModal.module.css'
import { useState } from 'react'

interface EditModalProps {
  taskId: string
  setModalIsOpen: (isOpen: boolean) => void
}

export function EditModal({ taskId, setModalIsOpen }: EditModalProps) {
  const [title, seTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleEditTask = async () => {
    await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h1>Editar tarefa</h1>
          <X className={styles.xIcon} onClick={() => setModalIsOpen(false)} />
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyInputContainer}>
            <h4>Title</h4>
            <input
              type="text"
              className={styles.modalBodyInput}
              onChange={(e) => seTitle(e.target.value)}
            />
          </div>
          <div className={styles.modalBodyInputContainer}>
            <h4>Description</h4>
            <input
              type="text"
              className={styles.modalBodyInput}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={handleEditTask}>Editar</button>
        </div>
      </div>
    </div>
  )
}
