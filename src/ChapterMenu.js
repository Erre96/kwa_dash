import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card, Form, Input } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import firebase from "firebase";
import { Link, BrowserRouter as Router } from 'react-router-dom'


export function targetInfo() {
    let chosenChapterId;
    let chapterTitle;
    let chapterSubHead;
    let chapterIndex;
    let taskIndex;
}

export function chapterData() {
    let id = '';
    let premium = false;
    let title = '';
    let subHead = '';
    let bodyTitle = '';
    let bodyText = '';

    let videos = [{
        title: '',
        url: '',
    }]

};


export default class ChapterMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chapterChosen: false,
            chosenChapterId: '',
            chapters: [],
            openChapter: '',
            bodyTitle: '',
            bodyText: '',

        }

    }

    render() {
        //console.log(this.state.chosenChapterId+"    hoo");
        return (
            <Container>
                {
                    this.state.chapters.map((chap, index) => {
                        return (
                            <Card
                                className="mt-3" key={index}>
                                <Row className="mt-5 justify-content-center">
                                    <Col className="text-center">
                                        <div>
                                            <h3>{chap.title}</h3>
                                            <p>{chap.subHead}</p>
                                        </div>
                                    </Col>

                                    <Col>
                                        <Link to="/TasksList">
                                            <Button style={{ marginLeft: 10 }} value={chap.id} onClick={() => (this.setTargetInfo(chap.id, chap.title, chap.subHead, index))}>Övningssida</Button>
                                        </Link>

                                        <Link to="/EditChapter">
                                            <   Button style={{ marginLeft: 10, backgroundColor: ('green') }} value={chap.id} onClick={() => (this.setChapterData(chap, index))}>Redigera</Button>
                                        </Link>

                                        <Button style={{ marginLeft: 10, backgroundColor: ('red') }} value={chap.id} onClick={() => (this.deleteDocument(chap.id))}>Ta bort</Button>
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

    
    setTargetInfo(chapId, title, subHead, index) {
        targetInfo.chosenChapterId = chapId;
        targetInfo.chapterTitle = title;
        targetInfo.chapterSubHead = subHead;
        targetInfo.chapterIndex = index;
    }

    setChapterData(chapter, index) {
        targetInfo.chapterIndex = index;
        
        chapterData.id = chapter.id;
        chapterData.title = chapter.title;
        chapterData.subHead = chapter.subHead;
        chapterData.bodyText = chapter.bodyText;
        chapterData.bodyTitle = chapter.bodyTitle;
        chapterData.premium = chapter.premium;
        chapterData.videos = chapter.videos;
    }

    componentDidMount() {
        this.mounted = true;
        this.getChaptersData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async getChaptersData() {
        console.log("get data called");

        db.collection("chapters").doc("portals").onSnapshot((snap) => {
            console.log(snap);
            const doc = snap.data();
            if (doc) {
                if (this.mounted) {
                    this.setState({
                        chapters: doc.list
                    });
                }
            }
        });
    }


    getChaptersList() {
        console.log(this.state.chapters);
        return this.state.chapters;
    }

    deleteDocument(chapId) {
        db.runTransaction(async (t) => {
            const chapterRef = db.collection("chapters").doc(chapId);
            const portalsRef = db.collection("chapters").doc("portals");
            const portalsDoc = await t.get(portalsRef);
            const portal = portalsDoc.data();

            let targetIndex;

            portal.list.forEach((item, index) => {
                if (item.id === chapId) {
                    console.log(item.id);
                    targetIndex = index;
                    return;
                }
            });

            if (targetIndex !== null) {
                portal.list.splice(targetIndex, 1);

            }



            t.delete(chapterRef);
            t.update(portalsRef, portal);
        });
    }
}