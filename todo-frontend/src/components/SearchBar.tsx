import { ChangeEvent, InvalidEvent, useState } from 'react'
import styles from './SearchBar.module.css'
import { taskType } from './TasksArea'

import plusIcon from '../assets/botao-add.svg'

interface SearchBarProps {
  onCreateTask: (task: taskType) => void
  taskValue: taskType[]
}

export function SearchBar({ onCreateTask, taskValue }: SearchBarProps) {
  const [newTaskText, setNewTaskText] = useState('')
  const [searchFocus, setSearchFocus] = useState(true)

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event?.target.value)
  }

  function handleCreateTask() {
    if (newTaskText.length !== 0) {
      const newKey =
        taskValue.length > 0
          ? Math.max(...taskValue.map((task) => task.key)) + 1
          : 1

      const newTask = {
        key: newKey,
        nomeTarefa: newTaskText,
        isChecked: false
      }

      onCreateTask(newTask)
      setNewTaskText('') // Limpar o texto após criar a tarefa
    }
  }

  function handleNewTaksInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleTurnSearchFocusFalse() {
    setSearchFocus(false)
  }

  function handleTurnSearchFocusTrue() {
    setSearchFocus(true)
  }

  const isNewTaskInputEmpty = newTaskText.length == 0

  return (
    <div className={styles.searchBarContainer}>
      <input
        onChange={handleNewTaskChange}
        className={styles.searchBar}
        type="search"
        placeholder="Adicione uma nova tarefa"
        value={newTaskText}
        required
        onInvalid={handleNewTaksInvalid}
        onFocus={handleTurnSearchFocusFalse}
        onBlur={handleTurnSearchFocusTrue}
      />
      <button
        className={styles.createTaskBtn}
        onClick={handleCreateTask}
        disabled={isNewTaskInputEmpty && searchFocus}
        type="button"
      >
        Criar <img src={plusIcon} alt="" />
      </button>
    </div>
  )
}
