import React, { Component } from 'react'
import { targetInfo, chapterData } from './ChapterMenu';
import { db } from './FirebaseData';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link, BrowserRouter as Router } from 'react-router-dom';

export function taskData() {
    let id = '';
}

export class TasksList extends React.Component {
    constructor(props) {
        super(props);

        this.goToTaskCreation = this.goToTaskCreation.bind(this);

        this.state = {
            tasks: [],
        }
    }

    setTaskId(id, index) {
        targetInfo.taskIndex = index;
        taskData.id = id;
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

    componentDidMount() {
        if (targetInfo.chosenChapterId !== null) {
            this.mounted = true;
            this.getTasksData();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
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

    async deleteTask(taskId, index) {
        db.runTransaction(async (t) => {
            const chapterRef = db.collection("chapters").doc(targetInfo.chosenChapterId);
            const portalsRef = db.collection("chapters").doc("portals");

            const portalsDoc = await t.get(portalsRef);
            const chapterDoc = await t.get(chapterRef);

            const portal = portalsDoc.data();
            const chapter = chapterDoc.data();
            
            const list = portal.list;
            list[targetInfo.chapterIndex].taskIds.splice(index,1);
            portal.list = list;

            chapter.tasks.splice(index, 1);

            t.delete(chapterRef.collection('tasks').doc(taskId));
            t.update(chapterRef, chapter);
            t.update(portalsRef, portal);
        });
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
                                                    <Button onClick={() => (this.setTaskId(task.id, index))}>Redigera</Button>
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Button style={{ backgroundColor: ('red') }} onClick={() => (this.deleteTask(task.id, index))}>Ta Bort</Button>
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
                <div style={{ marginTop: 15 }} className="text-center">
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
