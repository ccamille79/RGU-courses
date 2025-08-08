import Head from "next/head";
import { Container, Row, Card, Button } from "react-bootstrap";
import React, { useState } from 'react';
import {useQuery} from 'react-query'
import axios from 'axios'



export default function DadJoke() {
  /// The state
  const [dadJoke, setDadJoke] = useState('');

  return (
    <Container className="md-container">
      <Head>
        <title>A Dad Joke</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className="App-header">
        <h1>Dad Joke</h1>
        
        <button onClick={() => {
          console.log("Retrieving a dad joke")
          let options = {
            headers: {
                'User-Agent': 'Robert Gordon',
                'Accept': 'text/plain'
            }
          }
          axios.get('https://icanhazdadjoke.com/', options).then((response) => {
            console.log(response.data)
            setDadJoke(response.data)
          });
          
        }}>Get Dad Joke</button>

        <p>{dadJoke}</p>

      </div>
    </Container>
  );
}
