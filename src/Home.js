import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Navbar } from "react-bootstrap";
import CreateChapter from './CreateChapter'
import EditChapter from './EditChapter'
import EditTask from './EditTask'
import ChapterMenu from './ChapterMenu'
import TasksList from './TasksList'
import CreateTask from './CreateTask'
import AlertPage from './AlertPage'
import Login from './Login'

import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'


export default class MyNavBar extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar bg="dark" expand="lg">
                        <Row className="text-center">
                            <h3 style={{ color: "white", marginLeft: 30 }}>Kärlekstanken Dashboard</h3>
                            <Link style={{ color: "white", marginLeft: 30 }} to="/createChapter">Skapa Avsnitt</Link>
                            <Link style={{ color: "white", marginLeft: 30 }} to="/chapterMenu">Avsnittssida</Link>
                        </Row>
                    </Navbar>

                    <Container>
                        <div>
                            <Route path='/'>
                                <Redirect to="/login" />
                            </Route>
                            <Route path="/createChapter" component={CreateChapter} />
                            <Route path="/chapterMenu" component={ChapterMenu} />
                            <Route path="/tasksList" component={TasksList} />
                            <Route path="/createTask" component={CreateTask} />
                            <Route path="/editChapter" component={EditChapter} />
                            <Route path="/editTask" component={EditTask} />
                            <Route path="/alert" component={AlertPage} />
                            <Route path="/login" component={Login} />
                            <div>
                            </div>
                        </div>
                    </Container>
                </Router>
            </div>
        )
    }
}