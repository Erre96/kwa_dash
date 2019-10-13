import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase"


class Shit {
    constructor() {
        let a = 1;
        let b = "shiot";
    }
}

class createChapter extends React.Component {
    constructor(props) {
        super(props)

        this.shit = new Shit();

        this.handleInputchange = this.handleInputchange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.writeToFirebase = this.writeToFirebase.bind(this);

        this.state = {
            title: '',
            subHead: '',
            locked: false,
            description: '',
            videoLink: '',
            id: 0,
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
    writeToFirebase() {
        // let length = getLengthOfExistingChapters();
        // this.state.id = length + 1;

        let data = {
            title: this.state.title,
            subHead: this.state.subHead,
            locked: this.state.locked,
            description: this.state.description,
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
                            console.log("Document successfully updated!");
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }
            });
    }
    render() {
        const { title, subHead, locked, description, videoLink } = this.state
        //  console.log(title, subHead,locked, description, videoLink);

        return (
            <Container>
                <Row className="mt-3 justify-content-center">
                    <Col className="text-center">
                        <h1>Create Chapter</h1>
                        <p>Title of the chapter</p>
                        <input type="text" onChange={this.handleInputchange} name='title' value={title}></input>

                        <p>Subhead</p>
                        <input type="text" onChange={this.handleInputchange} name='subHead' value={subHead}></input>

                        <p>Locked content?</p>
                        <Form.Check type="checkbox" name="locked" checked={locked} onChange={this.handleCheckboxChange} />

                        <p>Description of the Chapter</p>
                        <textarea rows="4" cols="50" type="text" onChange={this.handleInputchange} name="description" value={description}></textarea>

                        <p>Video link</p>
                        <textarea rows="1" cols="60" type="text" onChange={this.handleInputchange} name="videoLink"></textarea>

                    </Col>
                </Row>
                <Row className="mt-3 justify-content-center">
                    <Col className="text-center">
                        <Button onClick={this.writeToFirebase}>Add</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

async function readChapterFromFirebase() {
    let portals = await db.collection("chapters").doc("portals").get();
    let gg = portals.data();
    console.log(gg.list[0]);
    /*
        portals.then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().list.length);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        */
}

export default createChapter