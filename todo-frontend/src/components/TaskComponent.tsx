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
  // onToggleTask: (task: Task) => void
}

export function TaskComponent({ data, onDeleteTask }: TaskComponentProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const [checked, setChecked] = useState(content.isChecked)

  const handleDeleteTask = async () => {
    // onDeleteTask(content)
    await fetch(`http://localhost:3333/tasks/${data.id}`, {
      method: 'DELETE'
    })

    onDeleteTask(data.id)
  }

  // const handleEditTask = async () => {}

  const handleChangeChecked = async () => {
    // setChecked(!checked)
  }

  return (
    <div>
      {modalIsOpen &&
        createPortal(
          <EditModal setModalIsOpen={setModalIsOpen} taskId={data.id} />,
          document.body
        )}
      <div className={styles.divWithTasks}>
        <div className={styles.divWithTasksContainer}>
          <div className={styles.divWithTasksContainerCheckBoxP}>
            <input
              onClick={handleChangeChecked}
              type="checkbox"
              // checked={checked}
              // onChange={handleChangeInput}
            />
            <p>{data.title}</p>
            <p>{data.description}</p>
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
