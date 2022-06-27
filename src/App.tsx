import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType}from "./TodoList";


function App() {
  const title: string = "What to learn"
  // const title: string = "What to buy"
  
  const [tasks, setTasks] = useState(
    [
      {id: 1, title: "HTML", isDone: true},
      {id: 2, title: "CSS", isDone: true},
      {id: 3, title: "JS/ES6", isDone: false},
    ]

  )
  
  
  const removeTask = (taskID: number) => {
    const updateTasks = tasks.filter(task => task.id !== taskID)
    setTasks(updateTasks)
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
        tasks={tasks}
        removeTask={removeTask}
      />
     {/*// <TodoList title={title_2} tasks={tasks_2}/>*/}
      
    </div>
  );
}

export default App;
