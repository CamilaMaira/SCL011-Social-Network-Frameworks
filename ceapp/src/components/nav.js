import React,{ useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

// props para checkear la 
const Nav = (props) => {

    return(
        <nav>
            <ul>
            <li><Link to="/">React test</Link></li>

            </ul>
            <ul>
            <li><Link to="/create">new post</Link></li>
            </ul>
        </nav>

    )


}
 
export default withRouter(Nav);