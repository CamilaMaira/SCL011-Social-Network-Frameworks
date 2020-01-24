import React from 'react';
import { Switch, Route } from 'react-router-dom';


// componentes

import Main from './components/Main';
import Signin from './components/SignIn';
import Login from './components/Login';
import Create from './components/CreatePost'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path ="/signin" component ={Signin} />
        <Route exact path ="/login" component ={Login} />
        <Route exact path ="/create" component ={Create} />
    </Switch>
)
 
export default Routes;