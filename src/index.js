import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'

fetch('http://localhost:3000/api')
  .then(response => response.json())
  .then(words => {
    createRoot(document.getElementById('root')).render(<App words={words}/>);
  })
  .catch(error => {
    console.error(error);
  });
