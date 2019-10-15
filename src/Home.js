import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Form, Navbar } from "react-bootstrap";
import CreateChapter from './CreateChapter'
import TaskMenu from './TaskMenu'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


export default class Home extends React.Component {
    render() {
        return (
            <Container>
                <Router>
                <h1 className="text-center">Kärlekstanken Dashboard</h1>
                    <div style={{ width: 200, marginLeft: -0, borderRadius: 5, backgroundColor:"#800000"}}>
                        <ul>
                            <li>
                                <Link style={{color:"white"}} to="/createChapter">Create Chapter</Link>
                            </li>
                            <li>
                                <Link style={{color:"white"}} to="/TaskMenu">Create Task</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Route path="/CreateChapter" component={CreateChapter} />
                        <Route path="/TaskMenu" component={TaskMenu} />
                        <div>

                        </div>
                    </div>
                </Router>
            </Container>
        )
    }
}