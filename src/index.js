import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './MyNavBar';
import { Container, Button, Row, Navbar } from "react-bootstrap";
import Login from './Login'
import CreateChapter from './CreateChapter'
import EditChapter from './EditChapter'
import EditTask from './EditTask'
import ChapterMenu from './ChapterMenu'
import TasksList from './TasksList'
import CreateTask from './CreateTask'
import AlertPage from './AlertPage'
import { PublicRoute, PrivateRoute } from './CustomRoutes'
import { AuthUserProvider } from './AuthUserContext'
import { Route, Link, BrowserRouter as Router, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { auth } from './FirebaseData';




const KEY_AUTH_USER = "authUser";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem(KEY_AUTH_USER)),
    }
  }

  componentDidMount() {
    this.unsubAuthUser = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
       // this.checkAdmin(authUser);
        localStorage.setItem(KEY_AUTH_USER, JSON.stringify(authUser));
        this.setState({ authUser: authUser });

      }
      else {
        localStorage.removeItem(KEY_AUTH_USER);
        this.setState({ authUser: null, coupleData: null, user: null });
      }
    });
  }

  async checkAdmin(authUser)
  {
    try{
      const idTokenResult = await authUser.getIdTokenResult();
      if(!idTokenResult.claims.admin)
      {
        auth.signOut();
      }
    }
    catch(e){

    }
  }

  render() {
    return (
      <div className="App">
        <AuthUserProvider value={this.state.authUser}>
          <BrowserRouter>
            <Switch>
              <PrivateRoute path="/createChapter" component={CreateChapter} exact />
              <PrivateRoute path="/chapterMenu" component={ChapterMenu} exact />
              <PrivateRoute path="/tasksList" component={TasksList} exact />
              <PrivateRoute path="/createTask" component={CreateTask} exact />
              <PrivateRoute path="/editChapter" component={EditChapter} exact />
              <PrivateRoute path="/editTask" component={EditTask} exact />
              <PrivateRoute path="/" component={MyNavBar} exact />
              <PrivateRoute path="/alert" component={AlertPage} exact />
              <PublicRoute path='/login' component={Login} restricted={true} exact />
            </Switch>
          </BrowserRouter>
        </AuthUserProvider>
      </div>
    );
  }
}




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


