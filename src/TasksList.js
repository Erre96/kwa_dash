import React, { Component } from 'react'
import { targetInfo } from './ChapterMenu';
import { db } from './FirebaseData';
import { Container, Button, Row, Col, Card, Form, Input } from "react-bootstrap";
import { Link, BrowserRouter as Router } from 'react-router-dom'

var htmlText;


export class TasksList extends React.Component {
    constructor(props) {
        super(props);

        this.goToTaskCreation = this.goToTaskCreation.bind(this);

        this.state = {
            tasks: [],
        }
    }

    goToTaskCreation = (event) => {
        this.setOpenChapter();
    }

    async setOpenChapter() {

        let snap = await db.collection("chapters").doc(targetInfo.chosenChapterId).get();
        let doc = snap.data();

        //console.log(doc.title + "   ye");

        if (this.mounted) {
            this.setState({
                openChapter: doc,
            });
        }
    }

    setHtmlText(event) { htmlText = event.target.value; }
    //setTaskId(event){taskId = event.target.value;}

    componentDidMount() {
        if (targetInfo.chosenChapterId !== null) {
            this.mounted = true;
            this.getTasksData();
        }
    }

    async getTasksData() {
        console.log("get data called");

        db.collection("chapters").doc(targetInfo.chosenChapterId).onSnapshot((snap) => {
            console.log(snap);
            const doc = snap.data();
            if (doc) {
                if (this.mounted) {
                    this.setState({
                        tasks: doc.tasks
                    });
                }
            }
        });

    }

    getTasksList() {
        console.log(this.state.chapters);
        return this.state.chapters;
    }


    render() {
        if (this.state.tasks !== undefined) {
            return (

                <div style={{ marginTop: 15 }}>
                    <Container className='text-center'>
                        <h3>{targetInfo.chapterTitle}</h3>
                        <h5>{targetInfo.chapterSubHead}</h5>
                        {
                            this.state.tasks.map((task, index) => {
                                return (
                                    <Card style={{ padding: 10 }} className="mt-3" key={index} >
                                        <Row>
                                            <Col>
                                                <p>{task.subHead}</p>
                                            </Col>

                                            <Col>
                                            <Link to='editTask'>
                                                <Button>Redigera</Button>
                                            </Link>
                                            </Col>
                                        </Row>
                                    </Card>
                                )
                            })
                        }
                        <AddButton></AddButton>
                    </Container>
                </div>
            )
        }
        else
            return (
                <div style={{marginTop: 15}}className="text-center">
                    <h3>{targetInfo.chapterTitle}</h3>
                    <h5>{targetInfo.chapterSubHead}</h5>
                    <AddButton></AddButton>
                </div>
            )
    }
}

function AddButton() {
    return (
        <Container className="text-center">
            <Link to="CreateTask">
                <Button style={{ marginTop: 20 }}>Lägg till övning</Button>
            </Link>
        </Container>
    )
}
export default TasksList
