//import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = {'Authorization': token};
  }
  render(){
    return (
      <Router>
        <div>
          <Header></Header>
          <div className='container'>
            <div>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route  path='https://amersblog.herokuapp.com/Login' component={Login}/>
                <Route  path='https://amersblog.herokuapp.com/Register' component={Register}/>
                <Route  path='https://amersblog.herokuapp.com/post/create' component={CreatePost}/>
                <Route  path='https://amersblog.herokuapp.com/post/view/:id' component={ViewPost}/>
                <Route  path='https://amersblog.herokuapp.com/post/edit/:id' component={EditPost}/>  
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  } 
}
 
export default App;
