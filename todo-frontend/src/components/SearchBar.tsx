import styles from './SearchBar.module.css'

import plusIcon from '../assets/botao-add.svg'
import { useState } from 'react'
import { Task } from '../types/tasks'

interface SearchBarProps {
  onCreateTask: (task: Task) => void
}

export function SearchBar({ onCreateTask }: SearchBarProps) {
  const [task, setTask] = useState('')

  const handleCreateTask = async () => {
    if (task.trim() === '') {
      return
    }

    const response = await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: task })
    })

    const data = await response.json()

    onCreateTask(data)
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.searchBar}
        type="search"
        placeholder="Adicione uma nova tarefa"
        required
        onChange={(e) => {
          setTask(e.target.value)
        }}
      />

      <button
        onClick={handleCreateTask}
        className={styles.createTaskBtn}
        type="button"
      >
        Criar <img src={plusIcon} alt="" />
      </button>
    </div>
  )
}
