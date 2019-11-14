import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card, Form, Input } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";

var htmlText;
var taskId;



export default class TaskMenu extends React.Component {
    constructor(props) {
        super(props);

        this.goToTaskCreation = this.goToTaskCreation.bind(this);
        this.writeToFirebase = this.writeToFirebase.bind(this)

        this.state = {
            chapterChosen: false,
            chosenChapterId: '',
            chapters: [],
            openChapter: '',

        }

    }

    writeToFirebase() {
        console.log(this.state.chosenChapterId);
        let task = {
            text: htmlText,
            id: taskId,
            done: false
        }

        let chapterId = this.state.chosenChapterId;


        var portalsRef = db.collection("chapters").doc(chapterId);
        portalsRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    portalsRef.onSnapshot((doc) => {
                        portalsRef.update({
                            tasks: firebase.firestore.FieldValue.arrayUnion(task)
                        })
                            .then(function () {
                                console.log("Document successfully updated!");
                            })
                            .catch(function (error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                    });
                } else {
                    portalsRef.set({
                        list: firebase.firestore.FieldValue.arrayUnion(task)
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
        console.log(this.state.chosenChapterId+"    hoo");
        if (this.state.chapterChosen === false) {
            return (
                <Container>
                    {
                        this.state.chapters.map((chap, index) => {
                            return (
                                <Card className="mt-3" key={index}>
                                    <Row className="mt-5 justify-content-center">
                                        <Col className="text-center">
                                            <div>
                                                <h3>{chap.title}</h3>
                                                <p>{chap.subHead}</p>
                                            </div>
                                        </Col>

                                        <Col>
                                            <Button style={{marginLeft:10}}value={chap.id} onClick={this.goToTaskCreation}>Lägg till övning</Button>
                                            <Button style={{marginLeft:10, backgroundColor:('green')}}value={chap.id} onClick={this.goToTaskCreation}>Redigera</Button>
                                            <Button style={{marginLeft:10, backgroundColor:('red')}}value={chap.id} onClick={this.goToTaskCreation}>Ta bort</Button>          
                                        </Col>
                                        <br />
                                    </Row>
                                </Card>
                            )
                        })
                    }
                </Container>
            )
        }
        if (this.state.chapterChosen === true) {
            return (
                <Container>
                    <div className="mt-3 text-center">

                        <Row className="justify-content-center">
                            <h3>{this.state.openChapter.title}</h3>
                        </Row>
                        <Row className="justify-content-center">
                            <h5 style={{ marginLeft: 15, fontStyle: "oblique" }}> {this.state.openChapter.subHead}</h5>
                        </Row>
                    </div>

                    <div className="form-group">
                        <label>Id</label>
                        <input type="text" className="form-control" onChange={this.setTaskId}></input>
                        <small>Övningen det gäller, exempelvis 1, 2 eller 3 </small>
                    </div>

                    <div className="form-group">
                        <label>HTML Text</label>
                        <textarea col="5" rows="5" type="text" className="form-control" onChange={this.setHtmlText}></textarea>
                        <small>Konvertera PDF texten till HTML online och klistra in resultatet här.</small>
                        <br />
                        <small>Här är en bra länk för att göra detta</small><br />
                        <a className="form-control" href="https://www.froala.com/online-html-editor">https://www.froala.com/online-html-editor</a>
                        <Button onClick={this.writeToFirebase} >Lägg till övning</Button>
                    </div>
                </Container>
            )
        }
    }

    setHtmlText(event){htmlText = event.target.value;}
    setTaskId(event){taskId = event.target.value;}

    componentDidMount() {
        this.mounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async getData() {
        console.log("get data called");

        const snap = await db.collection("chapters").doc("portals").get();
        const doc = snap.data();

        if (this.mounted) {
            this.setState({
                chapters: doc.list
            });
        }
    }


    async setOpenChapter() {

        let snap = await db.collection("chapters").doc(this.state.chosenChapterId).get();
        let doc = snap.data();

        //console.log(doc.title + "   ye");

        if (this.mounted) {
            this.setState({
                openChapter: doc,
            });
        }
    }
    goToTaskCreation = (event) => {
        this.state.chosenChapterId = event.target.value;
        this.state.chapterChosen = true;
        this.setOpenChapter();
    }

    goToTaskCreation() {

        this.getChosenChapter();
    }

    getChaptersList() {
        console.log(this.state.chapters);
        return this.state.chapters;
    }
}