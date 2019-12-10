import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Alert, Container } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";
import {chapterData, targetInfo} from './ChapterMenu';

class EditChapter extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputchange = this.handleInputchange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.writeToPortal = this.writeToPortal.bind(this);
        this.WriteChapter = this.WriteChapter.bind(this);

        this.state = {
            title: '',
            subHead: '',
            premium: false,
            bodyTitle: '',
            bodyText: '',
            firstVideoTitle: '',
            firstVideoLink: '',
            secondVideoTitle: '',
            secondVideoLink: '',
        }
    }

    async getSpecificChapterdata(id) {
        let loaded = false;
    
        const snap = await db.collection("chapters").doc(id).get();
        const doc = snap.data();
    
        if (doc) {
            /* un-green this if these varaibles need to be set for some reason later
            chapterData.bodyTitle = doc.title;
            chapterData.bodyText = doc.bodyText;
            chapterData.videos = doc.videos;*/

            this.state.bodyTitle = doc.bodyTitle;
            this.state.bodyText = doc.bodyText;

            if(doc.videos[0] !== undefined)
            {
                this.state.firstVideoLink = doc.videos[0].url;
                this.state.firstVideoTitle = doc.videos[0].title;
            }

            if(doc.videos[1] !== undefined)
            {
                this.state.secondVideoLink = doc.videos[1].url;
                this.state.secondVideoTitle = doc.videos[1].title;
            }
            console.log('hej3.41    ' + chapterData.bodyText);
            this.setState({});
        }
    }

    componentDidMount()
    {
        if(chapterData.title !== undefined)
        {
            console.log("hej1.44    "+chapterData.title);
            this.mounted = true;
            this.state.title = chapterData.title;
            this.state.subHead = chapterData.subHead;
            this.state.premium = chapterData.premium;
            this.state.bodyTitle = chapterData.bodyTitle;
            this.state.bodyText = chapterData.bodyText;
            this.getSpecificChapterdata(chapterData.id);
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

    async WriteChapter() {
        var idRef = db.collection("chapters").doc(chapterData.id);

        let videos = [];

        if (this.state.firstVideoTitle != null && this.state.firstVideoLink != null) {
            videos.push({ title: this.state.firstVideoTitle, url: this.state.firstVideoLink })
        }

        idRef.update({
            title: this.state.title,
            bodyTitle: this.state.bodyTitle,
            bodyText: this.state.bodyText,
            subHead: this.state.subHead,
            videos: videos,
        });
        this.writeToPortal(chapterData.id);
        this.setState({})
    }

    writeToPortal(id) {
        var portalsRef = db.collection("chapters").doc("portals");

        let portalData = {
            title: this.state.title,
            subHead: this.state.subHead,
            premium: this.state.premium,
            id: id,
            taskIds: [],
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
        const { title, subHead, premium, bodyText, firstVideoTitle, secondVideoTitle, firstVideoLink, secondVideoLink, bodyTitle } = this.state
        //  console.log(title, subHead,premium, description, videoLink);

        return (
            <Container>
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
                                <p>Premium content?</p>
                                <Form.Check type="checkbox" name="premium" checked={premium} onChange={this.handleCheckboxChange} />
                            </div>

                            <div className="mt-3">
                                <p>Introduction</p>
                                <input type="text" onChange={this.handleInputchange} name='bodyTitle' value={bodyTitle}></input>
                            </div>

                            <div className="mt-3">
                                <p>Description of the Chapter</p>
                                <textarea rows="4" cols="50" type="text" onChange={this.handleInputchange} name="bodyText" value={bodyText}></textarea>
                            </div>

                            <div className="mt-3" style={{ padding: 10 }}>
                                <Row className="justify-content-center" xs='6'>
                                    <Card style={{ padding: 25 }}>
                                        <div>
                                            <div><label>First Video Title</label></div>
                                            <input type="text" onChange={this.handleInputchange} name='firstVideoTitle' value={firstVideoTitle}></input>
                                        </div>
                                        <div>
                                            <div><label>First Video Link</label></div>
                                            <textarea rows="1" cols="60" type="text" onChange={this.handleInputchange} name="firstVideoLink" value={firstVideoLink}></textarea>
                                        </div>
                                    </Card>
                                </Row>
                            </div>

                            <div className="mt-3" style={{ padding: 10 }}>
                                <Row className="justify-content-center" xs='6'>
                                    <Card style={{ padding: 25 }}>
                                        <div>
                                            <div><label>Second Video Title</label></div>
                                            <input type="text" onChange={this.handleInputchange} name='secondVideoTitle' value={secondVideoTitle}></input>
                                        </div>
                                        <div>
                                            <p>Second Video Link</p>
                                            <textarea rows="1" cols="60" type="text" onChange={this.handleInputchange} name="secondVideoLink" value={secondVideoLink}></textarea>
                                        </div>
                                    </Card>
                                </Row>
                            </div>

                            <div className="mt-3">
                                <Button onClick={this.WriteChapter}>Update Chapter</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        )
    }
}

export function sendMessage() {
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

export default EditChapter