import React, {ChangeEvent, useState} from 'react';
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
    const onKeyPressValue = (event: any) => {
        if(event.charCode === 13) {
            addTitle()
        }
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
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { props.removeTask(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ () => { props.changeFilter("all") } }>
                All
            </button>
            <button onClick={ () => { props.changeFilter("active") } }>
                Active
            </button>
            <button onClick={ () => { props.changeFilter("completed") } }>
                Completed
            </button>
        </div>
    </div>
}
