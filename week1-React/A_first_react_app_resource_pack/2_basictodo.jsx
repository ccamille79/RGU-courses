import Head from "next/head";
import { Container, Row, Card, Button } from "react-bootstrap";

import { useState } from 'react';

let nextId = 0;

export default function Todo() {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);

  return (
    <>
        <div style={{ marginLeft: '200px', padding: '1rem' }}>
            <h1>To Do list:</h1>
            <input
                value={todoItem}
                onChange={e => setTodoItem(e.target.value)}
            />
            <button onClick={() => {
                setTodoList([
                ...todoList,
                { id: nextId++, item: todoItem }
                ]);
            }}>Add</button>
            <ul>
                {todoList.map(todoList => (
                <li key={todoList.id}>{todoList.item}</li>
                ))}
            </ul>
        </div>
    </>
  );
}
