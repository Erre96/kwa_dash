import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { db } from "./FirebaseData.js";
import { Link, BrowserRouter as Router } from 'react-router-dom'
import MyNavBar from './MyNavBar';

class EditOther extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputchange = this.handleInputchange.bind(this);
        this.updateDataOther = this.updateDataOther.bind(this);

        this.state = {
            aboutHTML: '',
            contactEmail: '',
            invitationMailHTML: false,
            invitationMailText: '',
            invitationMailTitle: '',
            purchaseModalHTML: '',
            welcomeModalHTML: '',
        }
    }

    async getSpecificString() {

        const snap = await db.collection("other").doc('strings').get();
        const doc = snap.data();

        if (doc) {
            this.state.aboutHTML = doc.aboutHTML;
            this.state.contactEmail = doc.contactEmail;
            this.state.invitationMailHTML = doc.invitationMailHTML;
            this.state.invitationMailText = doc.invitationMailText;
            this.state.invitationMailTitle = doc.invitationMailTitle;
            this.state.purchaseModalHTML = doc.purchaseModalHTML;
            this.state.welcomeModalHTML = doc.welcomeModalHTML;
            }
            this.setState({});
        }

    componentDidMount() {
            this.mounted = true;
            this.getSpecificString();
        }

    handleInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async updateDataOther() {
        let newData = {
            aboutHTML : this.state.aboutHTML,
            contactEmail : this.state.contactEmail,
            invitationMailHTML : this.state.invitationMailHTML,
            invitationMailText : this.state.invitationMailText,
            invitationMailTitle : this.state.invitationMailTitle,
            purchaseModalHTML : this.state.purchaseModalHTML,
            welcomeModalHTML : this.state.welcomeModalHTML,
        }
        var docRef = db.collection("other").doc("strings");
        await docRef.get().then(function (doc) {
            if (doc.exists) {
                db.collection("other").doc("strings").update({
                    aboutHTML : newData.aboutHTML,
                    contactEmail : newData.contactEmail,
                    invitationMailHTML : newData.invitationMailHTML,
                    invitationMailText : newData.invitationMailText,
                    invitationMailTitle : newData.invitationMailTitle,
                    purchaseModalHTML : newData.purchaseModalHTML,
                    welcomeModalHTML : newData.welcomeModalHTML,
                });


            } else {
                // doc.data() will be undefined in this case
                db.collection("other").doc("strings").set({
                    aboutHTML : newData.aboutHTML,
                    contactEmail : newData.contactEmail,
                    invitationMailHTML : newData.invitationMailHTML,
                    invitationMailText : newData.invitationMailText,
                    invitationMailTitle : newData.invitationMailTitle,
                    purchaseModalHTML : newData.purchaseModalHTML,
                    welcomeModalHTML : newData.welcomeModalHTML,
                });
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


    render() {
        const { aboutHTML, contactEmail, invitationMailHTML, invitationMailText, invitationMailTitle, purchaseModalHTML, welcomeModalHTML} = this.state
        //  console.log(title, subHead,premium, description, videoLink);

        return (
            <div>
            <MyNavBar></MyNavBar>
            <Container>
                <Card>
                    <Row className="mt-2 justify-content-center">
                        <Col className="text-center">
                            <h1>General</h1>
                            <div className="mt-3">
                                <p>About Karlekstanken (HTML)</p>
                                <textarea rows="12" cols="100" type="text" onChange={this.handleInputchange} name='aboutHTML' value={aboutHTML}></textarea>
                            </div>

                            <div className="mt-3">
                                <p>Contact E-mail</p>
                                <textarea rows="1" cols="100" type="text" onChange={this.handleInputchange} name='contactEmail' value={contactEmail}></textarea>
                            </div>

                            <div className="mt-3">
                                <p>invitation Mail (HTML)</p>
                                <textarea rows="12" cols="100" onChange={this.handleInputchange} name='invitationMailHTML' value={invitationMailHTML}></textarea>
                            </div>

                            <div className="mt-3">
                                <p>Invitation Mail Text</p>
                                <textarea rows="8" cols="100" onChange={this.handleInputchange} name='invitationMailText' value={invitationMailText}></textarea>
                            </div>

                            <div className="mt-3">
                                <p>Invitation Mail Title</p>
                                <textarea rows="4" cols="100" type="text" onChange={this.handleInputchange} name="invitationMailTitle" value={invitationMailTitle}></textarea>
                            </div>

                            <div className="mt-3">
                                <p>purchase Modal (HTML)</p>
                                <textarea rows="12" cols="100" type="text" onChange={this.handleInputchange} name="purchaseModalHTML" value={purchaseModalHTML}></textarea>
                            </div>
                                                        
                            <div className="mt-3">
                                <p>Welcome Modal (HTML)</p>
                                <textarea rows="12" cols="100" type="text" onChange={this.handleInputchange} name="welcomeModalHTML" value={welcomeModalHTML}></textarea>
                            </div>

                            <div className="mt-3">
                                <Link to='ChapterMenu'>
                                    <Button onClick={this.updateDataOther}>Update General</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
            </div>
        )
    }
}

export default EditOther