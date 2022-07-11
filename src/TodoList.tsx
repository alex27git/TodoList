import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeFilter: (filter: FilterValuesType) => void
  changeTaskStatus: (taskID: string, isDone: boolean) =>void
  addTask: (title: string) => void
  filter: FilterValuesType
}

const TodoList = (props:TodoListPropsType) => {
  console.log("TodoList")
  
  const [title, setTitle] = useState("")
  const [error, setError] =useState<boolean>(false)
  
  
  const tasksListItems = props.tasks.length
   ? props.tasks.map(task => {
    
    const removeTask = () => {props.removeTask(task.id)}
    const changeTaskStatus= (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(task.id, e.currentTarget.checked)
    return (
      <li >
        <input
          onChange={changeTaskStatus}
          type="checkbox" checked={task.isDone}
        />
        <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })
  : <span>Task is empty!</span>
  
  const onClickAddTask = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addTask(trimmedTitle)
    } else {
      setError(true)
    }
    setTitle("")
  }
  
  const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.ctrlKey ) {
      onClickAddTask()
    }
  }
  
  const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }
  
  const getChangeFilterHandler = (filter: FilterValuesType) => {
    return() => props.changeFilter(filter)
  }
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeAddTaskHandler}
          onKeyDown={onKeyDownAddTaskHandler}
          className={error ? "error" : ""}
        />
        <button onClick={onClickAddTask}>+</button>
        {error && <div style={{color: "hotpink"} }>Title is required! </div>}
      </div>
      <ul>
        {tasksListItems}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active" : ""}
          onClick={getChangeFilterHandler("all")}>All</button>
        <button
          className={props.filter === "active" ? "active" : ""}
          onClick={getChangeFilterHandler("active")}>Active</button>
        <button
          className={props.filter === "completed" ? "active" : ""}
          onClick={getChangeFilterHandler("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;