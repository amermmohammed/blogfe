import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        axios.defaults.headers.common = {'Authorization': ''};
        this.props.history.push('/');
    }

    render(){
        if(localStorage.getItem('token')){
            return(
                <div className='navbar'>
                <ul>
                    <li>
                        <Link to='https://amersblog.herokuapp.com/'>Home</Link>
                    </li>
                    <li>
                        <Link to='https://amersblog.herokuapp.com/post/create'>new Post</Link>
                    </li>
                    <li>
                        <a href='https://amersblog.herokuapp.com/Logout' onClick={this.logout}>Logout</a>
                    </li>
                </ul>
            </div>
            );
        }
        return(
            <div className='navbar'>
                <ul>
                    <li>
                        <Link to='https://amersblog.herokuapp.com/'>Home</Link>
                    </li>
                    <li>
                        <Link to='https://amersblog.herokuapp.com/Login'>Log in</Link>
                    </li>
                    <li>
                        <Link to='https://amersblog.herokuapp.com/Register'>Register</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header)