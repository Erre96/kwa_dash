import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Row, Navbar } from "react-bootstrap";

import { Route, Link, BrowserRouter as Router, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { auth } from './FirebaseData';

const KEY_AUTH_USER = "authUser";
export default class MyNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Row className="text-center">
                        <h3 style={{ color: "white", marginLeft: 30 }}>Kärlekstanken Dashboard</h3>
                        <Link style={{ color: "white", marginLeft: 30 }} to="/createChapter">Skapa Avsnitt</Link>
                        <Link style={{ color: "white", marginLeft: 30 }} to="/chapterMenu">Avsnittssida</Link>
                        <Link style={{ color: "white", marginLeft: 30 }} to="/editOther">General</Link>
                        <Button style={{ marginLeft: 30 }} onClick={()=> auth.signOut()}>Logga ut</Button>
                    </Row>
                </Navbar>
            </div>
        )
    }
}