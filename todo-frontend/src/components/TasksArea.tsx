import { useState, useEffect } from 'react'
import { Task } from '../types/tasks'
import { TaskComponent } from './TaskComponent'
import { SearchBar } from './SearchBar'
import styles from './TasksArea.module.css'
import clipBoard from '../assets/clipboard.svg'

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

  function onDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== id)
    setTasks(tasksWithoutDeletedOne)
  }

  function onCreateTask(task: Task) {
    setTasks([...tasks, task])
  }

  function onUpdateTask(data: {
    id: string
    title: string
    description: string
  }) {
    const updatedTasks = tasks.map((task) => {
      return task.id === data.id
        ? { ...task, title: data.title, description: data.description }
        : task
    })

    setTasks(updatedTasks)
  }

  function onCheckTask(data: { id: string; completed_at: string | null }) {
    const updatedCheckTasks = tasks.map((task) => {
      return task.id === data.id
        ? {
            ...task,
            completed_at: task.completed_at ? null : new Date().toISOString()
          }
        : task
    })

    setTasks(updatedCheckTasks)
  }

  // const hasTasks = tasks.length > 0

  const tasksToConclude = tasks.filter((task) => task.completed_at === null)
  const tasksConcluded = tasks.filter((task) => task.completed_at !== null)

  return (
    <main>
      <SearchBar onCreateTask={onCreateTask} />

      <div className={styles.tasksContainer}>
        <div className={styles.tasks}>
          <h2>Tasks</h2>
          {tasksToConclude.length > 0 ? (
            tasksToConclude.map((task) => {
              return (
                <TaskComponent
                  data={task}
                  onDeleteTask={onDeleteTask}
                  onUpdateTask={onUpdateTask}
                  onCheckTask={onCheckTask}
                />
              )
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
        </div>
        <div className={styles.tasks}>
          <h2>Tasks Concluídas</h2>
          {tasksConcluded.length > 0 ? (
            tasksConcluded.map((task) => {
              return (
                <TaskComponent
                  data={task}
                  onDeleteTask={onDeleteTask}
                  onUpdateTask={onUpdateTask}
                  onCheckTask={onCheckTask}
                />
              )
            })
          ) : (
            <div className={styles.divWithoutTasks}>
              <img src={clipBoard} alt="" />
              <div>
                <p>Você ainda não tem tarefas concluídas</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {hasTasks ? (
        tasks.map((task) => {
          return (
            <TaskComponent
              data={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          )
        })
      ) : (
        <div className={styles.divWithoutTasks}>
          <img src={clipBoard} alt="" />
          <div>
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )} */}
    </main>
  )
}
