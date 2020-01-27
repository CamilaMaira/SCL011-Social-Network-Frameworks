import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/createPost'


const Create = () => {

    // const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ cover, setCover ] = useState("");
    const [ routeRedirect, setRedirect ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const dispatch = useDispatch();
    const createPostAction = (post) => dispatch(createPost(post));
    //usando la data pasamos los "post" a traves de dispatch a la accion "createPost"

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />
    }

    const addPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        let post = {
            content,
            cover: cover[0],
        }

        await createPostAction(post);
        setLoading(false);
        setRedirect(true);

    }


    let form;
    if(loading){
        form = <div className="processing">
                    <p>Tu post esta en proceso</p>
                    <div className="loader">car gan do...</div>
                </div>
    }else{
        form = 
            <form onSubmit={addPost}>
            <p>Escribe un nuevo post</p>

            <label htmlFor="content"> Escribe aqui también:</label>
            <textarea name="content" onChange={(e) => setContent(e.target.value)} />

            <label htmlFor="cover" className="cover">Cover</label>
            <input type="file" onChange={(e) => setCover(e.target.files)} />

            <input type="submit" value="create post"/>

            </form>
    }

    return (
        <React.Fragment>
            {form}
        </React.Fragment>
    )
}

export default Create;