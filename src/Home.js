import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Navbar } from "react-bootstrap";
import CreateChapter from './CreateChapter'
import EditChapter from './EditChapter'
import ChapterMenu from './ChapterMenu'
import TasksList from './TasksList'
import CreateTask from './CreateTask'
import AlertPage from './AlertPage'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


export default class Home extends React.Component {
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
                            <Route path="/createChapter" component={CreateChapter} />
                            <Route path="/chapterMenu" component={ChapterMenu} />
                            <Route path="/tasksList" component={TasksList} />
                            <Route path="/createTask" component={CreateTask} />
                            <Route path="/editChapter" component={EditChapter} />
                            <Route path="/alert" component={AlertPage} />
                            <div>

                            </div>
                        </div>
                    </Container>
                </Router>
            </div>
        )
    }
}