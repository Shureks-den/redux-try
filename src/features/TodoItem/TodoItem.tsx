import React, { ChangeEventHandler, useState } from 'react';
import styles from './TodoItem.module.css';
import { todoItem } from '../../types/item';

export interface StandardComponentProps {
    item: todoItem
    idx: number
    handleChange: Function
};

export default function TodoItem({item, idx, handleChange}: StandardComponentProps) {
    return (
        <div className={styles['todo-list__item']}>
            <div> Название: {item.task} </div>
            <div>
                <label>
                <input type="checkbox" id={item.task + idx} name={item.task} checked={item.isFinished} onChange={() => handleChange(idx)}/>
                    Задание выполнено
                </label>
            </div>
            <div> 
                {`Дата создания: ${new Date(item.created)}`}
            </div>
        </div>
    )
}