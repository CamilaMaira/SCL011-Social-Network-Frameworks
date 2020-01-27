import React,{ useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../actions/logout';
import firebase from '../firebase/config'
import logOutUser from '../reducers/logout';

// props para checkear la 
const Nav = (props) => {

    // los nombres "logIn" y "signIn" salen de los reducers 
    const logInSelector = useSelector((state) => state.logIn);
    const signInSelector = useSelector((state) => state.signIn);
    const [userState, setUserState] = useState(null);
    const dispatch = useDispatch();
    const logOutUserAction =() => dispatch(logoutUser());

    useEffect(() => {
        firebase.getUserState().then(user => {
            setUserState(user);
        });

    })


    const logout = async() => {
        console.log("logout user");
        setUserState(null);
        await logOutUserAction();
        //props.history.replace('/');
    }

    let buttons;
    if ((logInSelector.user && logInSelector.user.hasOwnProperty("user")) || (signInSelector.user && 
    signInSelector.user.hasOwnProperty("user")) || userState != null ) {
        buttons = (
            <React.Fragment>
                <li>
                <button className="logout" onClick={logout}>Logout</button>
                </li>
            </React.Fragment>
        )
    }else{
        buttons = (
            <React.Fragment>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/login">Log In</Link></li>
            </React.Fragment>

        )

    }
       

    return(
        <nav>
            <ul>
            <li><Link to="/">React test</Link></li>

            </ul>
            <ul>
            <li><Link to="/create">new post</Link></li>
            {buttons}
            </ul>
        </nav>

    )


}
 
export default withRouter(Nav);