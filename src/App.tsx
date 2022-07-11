import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType}from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all"|"active"|"completed"

function App() {
  const title: string = "What to learn"
  // const title: string = "What to buy"
  
  const [tasks, setTasks] = useState<Array<TaskType>>(
    [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS/ES6", isDone: false},
    ]
  )
  
  const removeTask = (taskID: string) => {
    const updateTasks = tasks.filter((task:TaskType) => task.id !== taskID)
    setTasks(updateTasks)
  }
  
  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    
    const updateTasks = [newTask, ...tasks]
    setTasks(updateTasks)
  }
  
  const [filter, setFilter] = useState<FilterValuesType>("all")
  
  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} :t))
  }
  
  let tasksForRender;
  switch (filter) {
    case "completed":
      tasksForRender = tasks.filter(t => t.isDone)
      break
    case "active":
      tasksForRender = tasks.filter(t => !t.isDone)
      break
    default:
      tasksForRender = tasks
  }
  
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  return (
    <div className="App">
      <TodoList
        title={title}
        tasks={tasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
