import React, { Component } from 'react';
import { Container, Button, Row, Col, Form, Navbar, Alert } from "react-bootstrap";

export class AlertPage extends Component {
    render() {
        return (
            <div>
                <Alert className='text-center' style={{ marginTop: 30, padding: 20 }} variant="success">
                    <Alert.Heading>You succesfully created a new chapter!</Alert.Heading>
                    <p>
                        Good job.
                    </p>
                    <hr />
                    <p className="mb-0">
                        You better add some tasks to it as well!
                    </p>
                </Alert>
            </div>
        )
    }
}

export default AlertPage
