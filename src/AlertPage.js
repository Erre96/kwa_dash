import React, { Component } from 'react';
import { Container, Button, Row, Col, Form, Navbar, Alert } from "react-bootstrap";
import MyNavBar from './MyNavBar';

export class AlertPage extends Component {
    render() {
        return (
            <div>
                <MyNavBar></MyNavBar>
                <Alert className='text-center' style={{ marginTop: 30, padding: 20 }} variant="success">
                    <Alert.Heading>Du har skapat ett nytt avsnitt!</Alert.Heading>
                    <p>
                        Bra jobbat.
                    </p>
                    <hr />
                    <p className="mb-0">
                        Bäst du lägger till några övningar till den också!
                    </p>
                </Alert>
            </div>
        )
    }
}

export default AlertPage
