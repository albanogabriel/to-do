import clipBoard from '../assets/clipboard.svg'
import { SearchBar } from './SearchBar'
import { TaskComponent } from './TaskComponent'

import styles from './TasksArea.module.css'
import { useState } from 'react'

export interface taskType {
  key: number
  nomeTarefa: string
  isChecked: boolean
}

export function TasksArea() {
  const [taskValue, setTaskValue] = useState([
    { key: 1, nomeTarefa: 'Tomar 2 Litros de Água', isChecked: false }
  ])

  function toggleTask(constTaskValueAsParameter: taskType) {
    const updatedTasks = taskValue.map((task) => {
      if (task.key === constTaskValueAsParameter.key) {
        //vai alterar a propriedade isChecked para diferente do que era true -> false -> true
        return { ...task, isChecked: !task.isChecked }
      }
      return task
    })

    setTaskValue(updatedTasks)
  }

  function handleCreateTask(newTask: taskType) {
    setTaskValue([...taskValue, newTask])
  }

  function deleteTask(taskClickedOnButtonDelete: taskType) {
    const tasksWithoutDeleteOne = taskValue.filter((taskItem) => {
      return taskItem.key !== taskClickedOnButtonDelete.key
    })

    setTaskValue(tasksWithoutDeleteOne)
  }

  const taskArrayIsEmpty = taskValue.length === 0

  return (
    <main>
      <SearchBar onCreateTask={handleCreateTask} taskValue={taskValue} />

      <div className={styles.tasksInfoContainer}>
        <div className={styles.tasksInfo}>
          <p className={styles.taskInfoCreatedTasks}>Tarefas criadas</p>
          <span className={styles.taskInfoButton}>{taskValue.length}</span>
        </div>
        <div className={styles.tasksInfo}>
          <p className={styles.taskInfoCheckedTasks}>Concluídas</p>
          <span className={styles.taskInfoButton}>
            {taskValue.filter((task) => task.isChecked).length}
          </span>
        </div>
      </div>
      <div className={styles.divLine}></div>

      {taskArrayIsEmpty ? (
        <div className={styles.divWithoutTasks}>
          <img src={clipBoard} alt="" />
          <div>
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      ) : (
        taskValue.map((task) => {
          return (
            <TaskComponent
              content={task}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
            />
          )
        })
      )}
    </main>
  )
}
