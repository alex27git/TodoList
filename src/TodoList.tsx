import React from 'react';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: number) => void
}

const TodoList = (props:TodoListPropsType) => {
  const tasksListItems = props.tasks.map(task =>{
    const removeTask = () => {props.removeTask(task.id)}
    return (
      <li>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasksListItems}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;