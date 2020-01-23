import { combineReducers } from 'redux';

// import  the reducers from other files
// this is the main file que add todos los reduces y los exporta

import createUser from './signin';
import logInUser from './login';
import logOutUser from './logout';

const reducers = combineReducers({
    signIn: createUser,
    logIn: logInUser,
    logOut: logOutUser,

});

export default reducers;