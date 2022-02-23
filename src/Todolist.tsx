import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (title:string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("");

    const addTitle = () => {
        props.addNewTask(title)
        if (title) {
            setTitle('')
        }
    }

    const onChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressValue = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13) {
            addTitle();
        }
    }

    const selectAll = () => {
        props.changeFilter("all")
    }
    const selectActive = () => {
        props.changeFilter("active")
    }
    const selectCompleted = () => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeValue}
                   onKeyPress={onKeyPressValue }
            />
            <button onClick={addTitle}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)


                    return (<li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>)
                })
            }
        </ul>
        <div>
            <button onClick={ selectAll }>
                All
            </button>
            <button onClick={ selectActive }>
                Active
            </button>
            <button onClick={ selectCompleted }>
                Completed
            </button>
        </div>
    </div>
}
