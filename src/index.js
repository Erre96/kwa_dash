import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import CreateChapter from "./CreateChapter";




function App() {
    return (
        <CreateChapter></CreateChapter>
    );
  }
  
  export default App;





ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


