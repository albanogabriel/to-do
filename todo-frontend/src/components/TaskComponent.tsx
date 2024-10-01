import trashIcon from '../assets/trashicon.svg'
import pencilIcon from '../assets/pencil.svg'

import { Task } from '../types/tasks'
import styles from './TaskComponent.module.css'
import { createPortal } from 'react-dom'
import { EditModal } from './EditModal'
import { useState } from 'react'

interface TaskComponentProps {
  data: Task
  onDeleteTask: (id: string) => void
  onUpdateTask: (data: {
    id: string
    title: string
    description: string
  }) => void
  onCheckTask: (completedAt: {
    id: string
    completed_at: string | null
  }) => void
  // onToggleTask: (task: Task) => void
}

export function TaskComponent({
  data,
  onDeleteTask,
  onUpdateTask,
  onCheckTask
}: TaskComponentProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [checked, setChecked] = useState(data.completed_at !== null)

  const handleDeleteTask = async () => {
    // onDeleteTask(content)
    try {
      await fetch(`http://localhost:3333/tasks/${data.id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.log('erro')
    }

    onDeleteTask(data.id)
  }

  const handleChangeChecked = async () => {
    try {
      await fetch(`http://localhost:3333/tasks/${data.id}/toggle-completed`, {
        method: 'PATCH'
      })

      onCheckTask({
        id: data.id,
        completed_at: checked ? null : new Date().toISOString() // Toggle the completed_at value
      })

      setChecked(!checked)
    } catch (error) {
      console.log('handleChangeChecked error')
    }
  }

  return (
    <div>
      {modalIsOpen &&
        createPortal(
          <EditModal
            setModalIsOpen={setModalIsOpen}
            onUpdateTask={onUpdateTask}
            data={data}
          />,
          document.body
        )}
      <div className={styles.divWithTasks}>
        <div className={styles.divWithTasksContainer}>
          <div className={styles.divWithTasksContainerCheckBoxP}>
            <input
              onClick={handleChangeChecked}
              type="checkbox"
              checked={checked}
            />
            <p className={`${checked ? styles.checked : ''} ${styles.title}`}>
              {data.title}
            </p>
            <p
              className={`${checked ? styles.checked : ''} ${
                styles.description
              }`}
            >
              {data.description}
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => setModalIsOpen(true)}>
              <img className={styles.pencilIcon} src={pencilIcon} alt="" />
            </button>
            <button onClick={handleDeleteTask}>
              <img src={trashIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
