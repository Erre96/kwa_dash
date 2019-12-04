import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Alert, Container } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";
import { targetInfo } from './ChapterMenu';

var chapterAdded = false;


class CreateTask extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputchange = this.handleInputchange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.writeToPortal = this.writeToPortal.bind(this);
        this.writeToSubCollection = this.writeToSubCollection.bind(this);

        this.state = {
            id: '',
            bodyHTML: '',
            title: '',
            subHead: '',
            time: '',
        }
    }

    handleInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCheckboxChange = (event) => {
        this.setState({
            [event.target.name]: !this.state.premium
        })
    }

    writeToSubCollection() {
        const taskRef = db.collection("chapters").doc(targetInfo.chosenChapterId).collection('tasks').doc();
        let taskId = taskRef.id;

        taskRef.set({
            bodyHTML: this.state.bodyHTML,
            title: this.state.title,
            subHead: this.state.subHead,
            time: this.state.time,
        });
        this.writeToChapter(taskId);
        this.writeToPortal(taskId);
    }

    /*
    writeToPortal(taskId) {
        const idRef = db.collection("chapters").doc(targetInfo.chosenChapterId);
        idRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    idRef.update({
                        list: firebase.firestore.FieldValue.arrayUnion(taskId)
                    })
                        .then(function () {
                            console.log("Document successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                } else {
                    idRef.set({
                        tasks: firebase.firestore.FieldValue.arrayUnion(taskId)
                    })
                        .then(function () {
                            console.log("Document successfully created!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            });
    }*/
    writeToChapter(taskId) {

        let taskData = {
            bodyHTML: this.state.bodyHTML,
            title: this.state.title,
            subHead: this.state.subHead,
            time: this.state.time,
            id: taskId
        }

        const idRef = db.collection("chapters").doc(targetInfo.chosenChapterId);
        idRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    idRef.update({
                        tasks: firebase.firestore.FieldValue.arrayUnion(taskData)
                    })
                        .then(function () {
                            console.log("Document successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                } else {
                    idRef.set({
                        tasks: firebase.firestore.FieldValue.arrayUnion(taskData)
                    })
                        .then(function () {
                            console.log("Document successfully created!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            });
    }

    writeToPortal(id) {
        var portalsRef = db.collection("chapters").doc("portals");

        let portalData = {
            title: this.state.title,
            subHead: this.state.subHead,
            premium: this.state.premium,
            id: id,
        }

        portalsRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    portalsRef.update({
                        list: firebase.firestore.FieldValue.arrayUnion(portalData)
                    })
                        .then(function () {
                            console.log("Document successfully updated!");
                            this.WriteChapter(portalData);
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                } else {
                    portalsRef.set({
                        list: firebase.firestore.FieldValue.arrayUnion(portalData)
                    })
                        .then(function () {
                            console.log("Document successfully created!");
                            this.WriteChapter(portalData);
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            });
    }

    render() {
        const { title, subHead, time, bodyHTML } = this.state
        //  console.log(title, subHead,premium, description, videoLink);

        return (
            <Container>
                <Card>
                    <Row className="mt-2 justify-content-center">
                        <Col className="text-center">
                            <h1>Create Task</h1>
                            <div className="mt-3">
                                <p>Title of the Task</p>
                                <input type="text" onChange={this.handleInputchange} name='title' value={title}></input>
                            </div>

                            <div className="mt-3">
                                <p>Subhead</p>
                                <input type="text" onChange={this.handleInputchange} name='subHead' value={subHead}></input>
                            </div>

                            <div className="mt-3">
                                <p>Estimated Time to finish task</p>
                                <input type="text" onChange={this.handleInputchange} name='time' value={time}></input>
                            </div>

                            <div className="mt-3">
                                <p>HTML Content</p>
                                <textarea rows="4" cols="50" type="text" onChange={this.handleInputchange} name="bodyHTML" value={bodyHTML}></textarea>
                            </div>

                            <div className="mt-3">
                                <Button onClick={this.writeToSubCollection}>Add</Button>
                            </div>

                        </Col>
                    </Row>
                </Card>
            </Container>
        )
    }
}

export default CreateTask