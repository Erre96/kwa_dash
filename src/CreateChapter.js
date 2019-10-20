import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";

var chapterAdded = false;


class CreateChapter extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputchange = this.handleInputchange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.writeToFirebase = this.writeToFirebase.bind(this);

        this.state = {
            title: '',
            subHead: '',
            locked: false,
            bodyText: '',
            videoLink: '',
            id: '',
        }
    }

    handleInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCheckboxChange = (event) => {
        this.setState({
            [event.target.name]: !this.state.locked
        })
    }

    async writeToDatabase2(data) {
        var idRef = db.collection("chapters").doc(data.id);
        idRef.set({
            title: data.title,
            bodyText: data.bodyText,
            videoLink: data.videoLink,
            subHead: data.subHead,
            id: data.id,
        });
        chapterAdded = true;
        this.setState({})
    }

    writeToFirebase() {
        let data = {
            title: this.state.title,
            subHead: this.state.subHead,
            locked: this.state.locked,
            bodyText: this.state.bodyText,
            videoLink: this.state.videoLink,
            id: this.state.id,
        }
        

        var portalsRef = db.collection("chapters").doc("portals");
        portalsRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    portalsRef.onSnapshot((doc) => {
                        portalsRef.update({
                            list: firebase.firestore.FieldValue.arrayUnion(data)
                        })
                            .then(function () {
                                console.log("Document successfully updated!");
                                this.writeToDatabase2(data);
                            })
                            .catch(function (error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                    });
                } else {
                    portalsRef.set({
                        list: firebase.firestore.FieldValue.arrayUnion(data)
                    })
                        .then(function () {
                            console.log("Document successfully created!");
                            this.writeToDatabase2(data);
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            });
    }

    render() {
        const { title, subHead, locked, description, videoLink, id } = this.state
        //  console.log(title, subHead,locked, description, videoLink);

        return (
            <Card>
                <Row className="mt-2 justify-content-center">
                    <Col className="text-center">
                        <h1>Create Chapter</h1>
                        <div className="mt-3">
                            <p>Title of the chapter</p>
                            <input type="text" onChange={this.handleInputchange} name='title' value={title}></input>
                        </div>

                        <div className="mt-3">
                            <p>Subhead</p>
                            <input type="text" onChange={this.handleInputchange} name='subHead' value={subHead}></input>
                        </div>

                        <div className="mt-3">
                            <p>Id</p>
                            <input type="text" onChange={this.handleInputchange} name='id' value={id}></input>
                        </div>

                        <div className="mt-3">
                            <p>Locked content?</p>
                            <Form.Check type="checkbox" name="locked" checked={locked} onChange={this.handleCheckboxChange} />
                        </div>

                        <div className="mt-3">
                            <p>Description of the Chapter</p>
                            <textarea rows="4" cols="50" type="text" onChange={this.handleInputchange} name="bodyText" value={description}></textarea>
                        </div>

                        <div className="mt-3">
                            <p>Video link</p>
                            <textarea rows="1" cols="60" type="text" onChange={this.handleInputchange} name="videoLink"></textarea>
                        </div>

                        <div className="mt-3">
                            <Button onClick={this.writeToFirebase}>Add</Button>
                        </div>

                    </Col>
                </Row>
            </Card>
        )
    }
}

function sendMessage() {
    return (
        <Alert variant="success">
            <Alert.Heading>You succesfully created a new chapter!</Alert.Heading>
            <p>
                Good job.
        </p>
            <hr />
            <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice
                and tidy.
        </p>
        </Alert>
    )
}

export default CreateChapter