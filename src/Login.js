import React, { Component } from 'react';
import {fire} from './FirebaseData';
import {Button, Row, Navbar } from "react-bootstrap";

export class Login extends Component {
    constructor(props) {
        super(props)

        this.login = this.login.bind(this);
        this.handleInputchange = this.handleInputchange.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }


    handleInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.setState({
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg">
            <Row className="text-center">
                <h3 style={{ color: "white", marginLeft: 30 }}>Kärlekstanken Dashboard</h3>
                <div style={{marginLeft:20}}>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Din email' name='email' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <div style={{marginLeft:10}}>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='password' placeholder='Ditt lösenord' name='password' onChange={this.handleInputchange} /></p>
                    </form>
                </div>
                <p> <Button style={{marginLeft: 10}} onClick={this.login}>Logga in</Button></p>
            </Row>
        </Navbar>
        )
    }
}

export default Login