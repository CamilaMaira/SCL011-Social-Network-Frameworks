import React from 'react';
import { Switch, Route } from 'react-router-dom';


// componentes

import Main from './components/Main'
import Signin from './components/SignIn'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path ="/signin" component ={Signin} />
    </Switch>
)
 
export default Routes;