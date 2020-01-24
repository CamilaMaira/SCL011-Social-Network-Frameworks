import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

// actions 
import { loginUser } from '../actions/login';


const Login = () => {

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    const [ redirect, setRedirect ] = useState(false);
    const dispatch = useDispatch();
    const logInUserAction = (email, password) => dispatch(loginUser(email, password));


    const login = async(e) => {
        e.preventDefault();
        if(email !== "" && password !== ""){
            let user = await logInUserAction(email, password);
            console.log(user);
            if(user){
                setRedirect(true);
            }
        }else{
            console.log("loggin user")
        }
    }

    const redirectTo = redirect;
    if(redirect){
        return <Redirect to="/" />
    }

    return (
        <React.Fragment>
            <form onSubmit={login}>
                <p>hola de nuevo</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" 
                onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" 
                onChange={(e) => setPassword(e.target.value)}/>

                <input type="submit" value="Entrar"/>
            </form>
        </React.Fragment>
    )


}

export default Login;