import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: "createChapter"
        }
    }
    render() {
        const page = this.state.page;
        if (page == "home") {
            return home();
        }
        if (page == "createChapter") {
            return createChapter();
        }
    }
}

function home() {
    return (
        <Container>
            <Row className="mt-3 justify-content-center">
                <Col className="text-center">
                    <h1>KWA DASH</h1>
                    <Button> Create Chapter</Button>
                    <Button className="ml-2">Create Task</Button>
                </Col>
            </Row>
        </Container>
    )
}

function createChapter() {
    let title;
    
    function setTitleName(event)
    {
        console.log(event.target.value);
        title=event.target.value
    }

    return (
        <Container>
            <Row className="mt-3 justify-content-center">
                <Col className="text-center">
                    <h1>Create Chapter</h1>
                    <p>Title of the chapter</p>
                    <input onChange={setTitleName}></input>
                </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
                <Col className="text-center">
                    <Button onClick={addChapterToFirebase(title)}>Add</Button>    
                </Col>
            </Row>  
        </Container>
    )
    
}

function addChapterToFirebase(title)
{

}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


