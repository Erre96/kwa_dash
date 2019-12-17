import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Alert, Container } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";
import { targetInfo } from './ChapterMenu';



class CreateTask extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputchange = this.handleInputchange.bind(this);
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
    

    addTaskIdToPortals(taskId) {
        var docRef = db.collection("chapters").doc("portals");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                let data = doc.data();
                let list = data.list;
                let index = targetInfo.chapterIndex;

                let olderTasks = [];
                olderTasks = list[index].taskIds;

                let taskIds = olderTasks;
                taskIds.push(taskId);

                let indexUpdate = {
                    id: list[index].id,
                    premium: list[index].premium,
                    subHead: list[index].subHead,
                    taskIds : taskIds,
                    title: list[index].title,
                }
                list[index] = indexUpdate;
                console.log("done with task id update   "+list[index]);

                db.collection("chapters").doc("portals").update({list
                });
                

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });  
    }

    writeToSubCollection() {
        db.runTransaction(async(t)=>{
        const taskRef = db.collection("chapters").doc(targetInfo.chosenChapterId).collection('tasks').doc();
        let taskId = taskRef.id;

        taskRef.set({
            bodyHTML: this.state.bodyHTML,
            title: this.state.title,
            subHead: this.state.subHead,
            time: this.state.time,
        });
        this.writeToChapter(taskId);
        this.addTaskIdToPortals(taskId);
    }
    )}

    writeToChapter(taskId) {

        let taskData = {
            title: this.state.title,
            subHead: this.state.subHead,
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