// import { tasks, TaskType } from './lib/tasks'

import todoLogo from './assets/todologo.svg'

import styles from './App.module.css'

import './global.css'
import { TasksArea } from './components/TasksArea'

function App() {
  return (
    <div>
      <header className={styles.header}>
        <img src={todoLogo} alt="logo todo" />
      </header>

      <div className={styles.tasksContainer}>
        <TasksArea />
      </div>
    </div>
  )
}

export default App
