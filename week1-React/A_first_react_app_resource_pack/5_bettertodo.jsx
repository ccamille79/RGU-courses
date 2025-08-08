import Head from "next/head";
import { Container, Row, Card, Button } from "react-bootstrap";
import React, { useState } from 'react';
import {useQuery} from 'react-query'
import axios from 'axios'



export default function Home() {
  /// The state
  //this.state = { items: [], text: ''};
  const [toDoItem, setToDoItem] = useState('');
  const [toDoList, setToDoList] = useState([]);

  let nextId = 0;

  return (
    <Container className="md-container">
      <Head>
        <title>ToDo List</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className="App-header">
        <h1>My Fancy To Do List</h1>
        <input
          value={toDoItem}
          onChange={e => setToDoItem(e.target.value)}
        />
    
         <button onClick={() => {
          nextId = toDoList.length
          console.log("Adding todo id "+ nextId)
          setToDoList([
            ...toDoList,
            { id: nextId, name: toDoItem, done: false }
          ]);
            var requestURI = "http://127.0.0.1:8000/api/todolist?todoNumber=" + nextId + "&todoText=" + toDoItem
            console.log(requestURI)
            axios.post(requestURI)
        }}>Add</button>
        
        <ul>
          {toDoList.map(toDoItem => (
            <li key={toDoItem.id}>
            {toDoItem.name}{' '}
            <button onClick={() => {
              setToDoList(
                toDoList.filter(a =>
                  a.id !== toDoItem.id
                )
              );
                var requestURI = "http://127.0.0.1:8000/api/todolist?todoNumber=" + toDoItem.id + "&todoText=" + toDoItem.name
                console.log(requestURI)
                axios.delete(requestURI)
            }}>
            Done
            </button>
            </li>
          ))}
        </ul>
        <button onClick={() => {
          console.log("Retrieving ToDo list")
          axios.get('http://127.0.0.1:8000/api/todolist').then((response) => {
            console.log(response.data)

            // If I'd got the server response to be a perfect match for the react, I wouldn't need this!
            function untidy_mapping(element) {
              return{ id: Number(element.todoNumber), name: element.todoText, done: false };
            }
            const retrievedToDoList = response.data.map(untidy_mapping);
            console.log("The todo list length: " + toDoList.length)
            
            setToDoList([
                ...retrievedToDoList
            ])
        
            
          });
          console.log("And the effect on state:")
          console.log(toDoList)
          
        }}>Retrieve ToDo List</button>
         

      </div>
    </Container>
  );
}
