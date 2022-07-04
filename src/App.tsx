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
  
  let tasksForRender;
  switch (filter) {
    case "completed":
      tasksForRender = tasks.filter(t => t.isDone === true)
      break
    case "active":
      tasksForRender = tasks.filter(t => t.isDone === false)
      break
    default:
      tasksForRender = tasks
  }
  
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  
  }
  // const tasks_2: Array<TaskType> = [
  //   {id: 1, title: "Brad", isDone: true},
  //   {id: 2, title: "Sugar", isDone: false},
  //   {id: 3, title: "buckwheat", isDone: true},
  // ]

  return (
    <div className="App">
      <TodoList
        title={title}
        tasks={tasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
     {/*// <TodoList title={title_2} tasks={tasks_2}/>*/}
      
    </div>
  );
}

export default App;
