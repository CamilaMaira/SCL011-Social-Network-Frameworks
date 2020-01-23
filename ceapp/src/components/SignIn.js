import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// action 
// import { createUser } from '../actions/signin'


const Signin = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        console.log("user created")
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

