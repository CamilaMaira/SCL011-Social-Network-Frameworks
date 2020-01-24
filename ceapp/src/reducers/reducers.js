import { combineReducers } from 'redux';

// import  the reducers from other files
// this is the main file que add todos los reduces y los exporta

import createUser from './signin';
import logInUser from './login';
import logOutUser from './logout';
import createPost from './createPost';

const reducers = combineReducers({
    signIn: createUser,
    logIn: logInUser,
    logOut: logOutUser,
    create: createPost,

});

export default reducers;