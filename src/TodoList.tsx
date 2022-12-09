import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')

    }

    const onAllClickHandler = ()=> {props.changeFilter('all')}
    const onCompletedClickHandler = ()=> {props.changeFilter('completed')}
    const onActiveClickHandler = ()=> {props.changeFilter('active')}
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyUp={onKeyUpHandler} />

            <button onClick={addTask}>+</button>
        </div>

        <ul>
            {
                props.tasks.map(t => {

                    const onRemoveHandler = () => { props.removeTask(t.id) }
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick= {onRemoveHandler}> x  </button>
                    </li>
                })}
        </ul>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>

    </div>


}