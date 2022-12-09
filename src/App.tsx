import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
export type FilterValuesType = 'all' | 'completed' | 'active';
function App() {

       let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
       let [filter, setFilter] = useState<FilterValuesType> ('all')

    let tasksForTodolist = tasks
    if ( filter === 'completed') {
        tasksForTodolist = tasks.filter(t=>t.isDone===true)
    }
    if ( filter === 'active') {
        tasksForTodolist = tasks.filter(t=>t.isDone===false)
    }
function changeFilter (value:FilterValuesType)  {
           setFilter (value);
    }
    function removeTask (id:string){
        let filteredTasks = tasks.filter(t =>
          t.id !== id) ;
            setTasks (filteredTasks)

         }
    const addTask = (title:string)=> {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [ newTask, ...tasks] ;
        setTasks (newTasks)
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask ={removeTask}
                      changeFilter = {changeFilter}
                      addTask = {addTask}
            />

        </div>
    );
}

export default App;
