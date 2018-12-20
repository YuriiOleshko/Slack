import React, { Component } from 'react';
import {Switch,Route,withRouter} from 'react-router-dom'
import App from'../App.js';
import Registration from  '../Authorization/Registration';
import Login from '../Authorization/Login'
class Root extends Component {
    render() {
        return (
        <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/login' component={Login}/>
        <Route path='/registration' component={Registration}/>
        </Switch>
        );
    }
}

export default Root;