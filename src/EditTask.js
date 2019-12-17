import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Alert, Container } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";
import { targetInfo } from './ChapterMenu';
import { taskData } from './TasksList';



class EditTask extends React.Component {
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

    componentDidMount() {
        this.mounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async getData() {
        if (taskData.id !== undefined && targetInfo.chosenChapterId !== undefined) {

            const snap = await db.collection("chapters").doc(targetInfo.chosenChapterId).collection('tasks').doc(taskData.id).get();
            const doc = snap.data();
            if (doc) {
                if (this.mounted) {
                    this.setState({
                        id: taskData.id,
                        title: doc.title,
                        subHead: doc.subHead,
                        bodyHTML: doc.bodyHTML,
                        time: doc.time,
                    });
                }
            }
        }
    }

    writeToSubCollection() {
        console.log('hej    '+taskData.id);
        db.runTransaction(async (t) => {
            const taskRef = db.collection("chapters").doc(targetInfo.chosenChapterId).collection('tasks').doc(taskData.id);
            let taskId = taskRef.id;

            taskRef.update({
                bodyHTML: this.state.bodyHTML,
                title: this.state.title,
                subHead: this.state.subHead,
                time: this.state.time,
            });
            this.writeToChapter(taskId);
        }
        )
    }

    async writeToChapter(taskId) {     
        let indexUpdate = {
            title: this.state.title,
            subHead: this.state.subHead,
            id: taskId,
        }


        var docRef = db.collection("chapters").doc(targetInfo.chosenChapterId);
        await docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                let data = doc.data();
                let newList = data.tasks;
                let index = targetInfo.taskIndex;
                
                newList[index] = indexUpdate;
                console.log("done with task id update   "+newList[index]);

                db.collection("chapters").doc(targetInfo.chosenChapterId).update({tasks : newList
                });
                

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
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
                            <form onSubmit={this.handleSubmit}>
                                <h1>Edit Task</h1>
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
                                    <Button onClick={this.writeToSubCollection}>Update</Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Card>
            </Container>
        )
    }
}

export default EditTask