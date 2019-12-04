import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Form, Navbar } from "react-bootstrap";
import CreateChapter from './CreateChapter'
import ChapterMenu from './ChapterMenu'
import TasksList from './TasksList'
import CreateTask from './CreateTask'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar bg="dark" expand="lg">
                        <Row className="text-center">
                            <h3 style={{color:"white", marginLeft:30}}>Kärlekstanken Dashboard</h3>
                            <Link style={{ color: "white", marginLeft:30 }} to="/createChapter">Skapa Avsnitt</Link>
                            <Link style={{ color: "white", marginLeft:30 }} to="/ChapterMenu">Avsnittssida</Link>
                        </Row>
                    </Navbar>
                    <Container>

                        <div>
                            <Route path="/CreateChapter" component={CreateChapter} />
                            <Route path="/ChapterMenu" component={ChapterMenu} />
                            <Route path="/TasksList" component={TasksList} />
                            <Route path="/CreateTask" component={CreateTask} />
                            <div>

                            </div>
                        </div>
                    </Container>
                </Router>
            </div>
        )
    }
}