import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {fire} from './FirebaseData';
import {Button} from 'react-bootstrap';

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
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className='text-center' style={{marginTop:20}}>
                <h1 style={{color:('white'), backgroundColor:('darkRed')}}>Kärlekstanken Dashboard</h1>
                <br></br>
                <h3>Logga in</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='text' placeholder='Din email' name='email' onChange={this.handleInputchange} /></p>
                    </form>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <p> <input type='password' placeholder='Ditt lösenord' name='password' onChange={this.handleInputchange} /></p>
                    </form>
                </div>
                <p> <Button onClick={this.login}>Logga in</Button></p>
            </div>
        )
    }
}

export default Login