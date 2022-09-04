import React, { MouseEvent, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    add,
    changeStatus,
    selectTodos
} from './todoSlice';

import styles from './Todo.module.css';
import TodoItem from '../TodoItem';

export default function Todo() {
    const todoList = useAppSelector(selectTodos);
    console.log(todoList)
    const dispatch = useAppDispatch();
    const title = useRef<HTMLInputElement>(null);
    
    const handleChange = (idx: number) => {
       dispatch(changeStatus({idx: idx, value: !todoList[idx].isFinished}));
    }
    const listItems = todoList.map((item, idx) => 
        <TodoItem item={item} idx={idx} key={item.task + idx} handleChange={handleChange}/>
   );

   const handleClick = (e: MouseEvent) => {
    const titleName = title.current;
    if (!titleName || titleName.value === '') {
        return;
    }
    const name = titleName.value;
    dispatch(add({value: {task: name, isFinished: false, created: new Date().getTime()}}));
    titleName.value = '';
   }

    return (
        <div>
            <div>
                <input placeholder='Название' ref={title}/>
                <button className={styles['btn']} onClick={handleClick}>
                    Добавить новую задачу
                </button>
            </div>
            <div className={styles['todo-list']}>
                {listItems}
            </div>
        </div>

    );
}
