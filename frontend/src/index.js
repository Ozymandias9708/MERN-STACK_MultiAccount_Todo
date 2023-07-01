import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './components/TODO/todostyle.css'

let body=document.getElementById('body')

ReactDOM.render(
    <App body={body}/>,
  document.getElementById('root')
)