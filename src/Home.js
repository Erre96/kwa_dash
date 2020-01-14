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
import { PublicRoute, PrivateRoute } from './CustomRoutes'
import { AuthUserProvider } from './AuthUserContext'
import {auth} from './FirebaseData';

import { Route, Link, BrowserRouter as Router, BrowserRouter, Switch, Redirect } from 'react-router-dom'

const KEY_AUTH_USER = "authUser";
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authUser: JSON.parse(localStorage.getItem(KEY_AUTH_USER)),
        }
    }

    componentDidMount() {
        this.unsubAuthUser = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem(KEY_AUTH_USER, JSON.stringify(authUser));
                this.setState({ authUser: authUser });

            }
            else {
                localStorage.removeItem(KEY_AUTH_USER);
                this.setState({ authUser: null, coupleData: null, user: null });
            }
        });
    }

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
                            <AuthUserProvider value={this.state.authUser}>
                            <BrowserRouter>
                                    <Switch>
                                <PublicRoute path='/'>
                                    <Redirect to="/login" />
                                </PublicRoute>
                                <PrivateRoute path="/createChapter" component={CreateChapter} exact />
                                <PrivateRoute path="/chapterMenu" component={ChapterMenu} exact />
                                <PrivateRoute path="/tasksList" component={TasksList} exact />
                                <PrivateRoute path="/createTask" component={CreateTask} exact />
                                <PrivateRoute path="/editChapter" component={EditChapter} exact />
                                <PrivateRoute path="/editTask" component={EditTask} exact />
                                <Route path="/alert" component={AlertPage} exact />
                                <PublicRoute path="/login" component={Login} exact />
                                </Switch>
                                </BrowserRouter>
                            </AuthUserProvider>
                            <div>

                            </div>
                        </div>
                    </Container>
                </Router>
            </div>
        )
    }
}