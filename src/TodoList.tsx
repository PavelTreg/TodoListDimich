import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import error = Simulate.error;

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: ( id:string, isDone: boolean) => void
    filter: FilterValuesType | ""
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());

        setNewTaskTitle('');}
    else {
            setError('Field is required')
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className= {error ? 'error' : ''}
                   /*если error cуществует, то добавим класс 'error', если нет то '' (ничего))*/
            />

            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
           {/* если ошибка есть, то мы покажем эту дивку*/}
        </div>

        <ul>
            {
                props.tasks.map(t => {

                    const onRemoveHandler = () => {props.removeTask(t.id)}
                    const changeCheckbox  = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus( t.id, e.currentTarget.checked)}
                    return (
                        <li key={t.id} className={t.isDone ?'is-done' : ""}>

                            <input type="checkbox"
                                   onChange={changeCheckbox}
                                   checked= {t.isDone}
                            />

                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}> x</button>
                        </li>
                    ) })}
        </ul>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
            onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
            onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
            onClick={onCompletedClickHandler}>Completed</button>

    </div>


}