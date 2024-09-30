// import { useState } from 'react'
import trashIcon from '../assets/trashicon.svg'
import pencilIcon from '../assets/pencil.svg'

// import { taskType } from './TasksArea'

import { Task } from '../types/tasks'
import styles from './TaskComponent.module.css'

interface TaskComponentProps {
  data: Task
  // onDeleteTask: (task: taskType) => void
  // onToggleTask: (task: taskType) => void
}

export function TaskComponent({ data }: TaskComponentProps) {
  // const [checked, setChecked] = useState(content.isChecked)

  const handleDeleteTask = async () => {
    // onDeleteTask(content)
    await fetch(`http://localhost:3333/tasks/${data.id}`, {
      method: 'DELETE'
    })
  }

  const handleChangeChecked = async () => {
    // setChecked(!checked)
  }

  return (
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
          <button onClick={handleDeleteTask}>
            <img className={styles.pencilIcon} src={pencilIcon} alt="" />
          </button>
          <button onClick={handleDeleteTask}>
            <img src={trashIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
