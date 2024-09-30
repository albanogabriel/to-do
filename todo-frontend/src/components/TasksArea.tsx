import clipBoard from '../assets/clipboard.svg'
import { useState, useEffect } from 'react'
import { Task } from '../types/tasks'
import { TaskComponent } from './TaskComponent'
import { SearchBar } from './SearchBar'
import styles from './TasksArea.module.css'

export function TasksArea() {
  const [tasks, setTasks] = useState<Task[] | []>([])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch('http://localhost:3333/tasks', {
          method: 'GET'
        })
        const data = await response.json() // Parse do JSON
        setTasks(data)
      } catch (error) {
        console.log('error')
      }
    }

    getTasks()
  }, [])

  const hasTasks = tasks.length > 0

  return (
    <main>
      <SearchBar />

      {hasTasks ? (
        tasks.map((task) => {
          return <TaskComponent data={task} />
        })
      ) : (
        <div className={styles.divWithoutTasks}>
          <img src={clipBoard} alt="" />
          <div>
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )}
    </main>
  )
}
