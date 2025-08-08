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
            }}>
            Done
            </button>
            </li>
          ))}
        </ul>
        <button onClick={() => {
          console.log("Getting ToDo list")
          axios.get('http://127.0.0.1:8000/api/todolist').then((response) => {
            console.log(response.data)

            // If I'd got the server response to be a perfect match for the react, I wouldn't need this!
            function untidy_mapping(element) {
              return{ id: Number(element.todoNumber), name: element.todoText, done: false };
            }
            const retrievedToDoList = response.data.map(untidy_mapping);
            setToDoList([
              ...toDoList,
              ...retrievedToDoList
            ]);
          });
          console.log("And the effect on state:")
          console.log(toDoList)
          
        }}>Retrieve ToDo List</button>
         
        <button onClick={() => {
          console.log("Deleting previous list")
          axios.delete("http://127.0.0.1:8000/api/todolist", { crossdomain: true }).then ((response) => {
            console.log("Storing items")
            toDoList.forEach( element =>
            {
              var requestURI = "http://127.0.0.1:8000/api/todolist?todoNumber=" + element.id + "&todoText=" + element.name
              console.log(requestURI)
              axios.post(requestURI)
            })
          })
        }}>Save ToDo List</button>


      </div>
    </Container>
  );
}
