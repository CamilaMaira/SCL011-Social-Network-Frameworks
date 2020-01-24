import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

// action 
import { createUser }  from '../actions/signin';


const Signin = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    //maneja las redirecciones
    const [ routeRedirect, setRedirect ] = useState(false);
    const dispatch = useDispatch();

    const createUserAction = (email, password) => dispatch(createUser(email, password));

    const signIn = async(e) => {
        e.preventDefault();
        // console.log("user created");

        if(email !== "" & password !== "" ){
            await createUserAction(email, password);
            //setRedirect(true)
        }else{
            console.log("necesitas llenar los espacios vacios");
        }
    }

    // if redirect is true nos redireccionar a la ruta mail, si es false pos no 
    const redirectTo = routeRedirect;
    if(redirectTo){
        return (
            <Redirect to="/" />
        )
    }


    return (
        <React.Fragment>
            <form onSubmit={signIn}>
                <p>crear nueva cuenta</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" 
                onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" 
                onChange={(e) => setPassword(e.target.value)}/>

                <input type="submit" value="crear cuenta"/>
            </form>
        </React.Fragment>
    )
}

export default Signin;

