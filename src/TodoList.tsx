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
  addTask: (title: string) => void
}

const TodoList = (props:TodoListPropsType) => {
  console.log("TodoList")
  
  const [title, setTitle] = useState("")
  
  const tasksListItems = props.tasks.map(task => {
    const removeTask = () => {props.removeTask(task.id)}
    return (
      <li>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })
  
  const onClickAddTask = () => {
    props.addTask(title)
    setTitle("")
  }
  
  const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "crtKey" ) {
      onClickAddTask()
    }
  }
  
  const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeAddTaskHandler}
          onKeyDown={onKeyDownAddTaskHandler}
        />
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
        {tasksListItems}
      </ul>
      <div>
        <button onClick={()=>props.changeFilter("all")}>All</button>
        <button onClick={()=>props.changeFilter("active")}>Active</button>
        <button onClick={()=>props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;