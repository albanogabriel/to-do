import { X } from 'phosphor-react'
import styles from './EditModal.module.css'
import { useState } from 'react'
import { Task } from '../types/tasks'

interface EditModalProps {
  data: Task
  setModalIsOpen: (isOpen: boolean) => void
  onUpdateTask: (data: {
    id: string
    title: string
    description: string
  }) => void
}

export function EditModal({
  data,
  setModalIsOpen,
  onUpdateTask
}: EditModalProps) {
  const [title, seTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleEditTask = async () => {
    if (!title) {
      alert('teste')
      return
    }

    await fetch(`http://localhost:3333/tasks/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        title: title,
        description: description
      })
    })

    onUpdateTask({
      id: data.id,
      title: title,
      description: description
    })

    setModalIsOpen(false)
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
