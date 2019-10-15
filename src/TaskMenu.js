import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";


var chapters = [];

export default class TaskMenu extends React.Component {
    constructor(props) {
        super(props);

        this.goToTaskCreation = this.goToTaskCreation.bind(this);

        this.state = {
            chapterChosen: false,
            chosenChapterId: '',

        }

    }

    render() {
        getChaptersListFromFirebase();
        if (this.state.chapterChosen == false) {
            return (
                <Container>
                    {
                        getChaptersList().map((chap, index) => {
                            return (
                                <Card key={index}>
                                    <Row className="mt-5">
                                        <Col className="text-center">
                                            <div>
                                                <h5>{chap.title}</h5>
                                                <p>{chap.subHead}</p>
                                            </div>
                                        </Col>

                                        <Col>
                                            <Button value={chap.id} onClick={this.goToTaskCreation}>Lägg till övning</Button>
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
        if(this.state.chapterChosen == true)
        {
            return (
                <div className="mt-3">
                <p></p>
            </div>
            )
        }
    }
    goToTaskCreation = (event) => {
        this.state.chapterChosen = true;

        this.setState({
            chosenChapterId: event.target.value
        })
    }

    goToTaskCreation() {

        console.log("shit");
    }
}
function getChaptersList() {
    console.log(chapters);
    return chapters;
}

    function getChaptersListFromFirebase() {
    let portalsRef = db.collection("chapters").doc("portals");
    portalsRef.get().then(function (doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            let data = doc.data();
            chapters = data.list;
            //console.log(chapters);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}
