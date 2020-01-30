import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../firebase/config';
import { Redirect } from 'react-router-dom';

//acciones

import { updatePost } from '../actions/updatePost';
import { deletePost } from '../actions/deletePost';
import { getPosts } from '../actions/getPosts';

const Post = (props) => {

    //login, signin
    const logInSelector = useSelector((state) => state.logIn)
    const signInSelector = useSelector ((state) => state.signIn)

    // manejo de estados
    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(null);

    //contenido, imagen y post(content)
    const [defaultContent, setDefaultContent] = useState("");
    const [fileref, setFileRef] = useState("");

    //rutas
    const [ routeRedirect, setRedirect] = useState("");

    const [ isBusy, setIsBusy] = useState(false);

    const contentRef = useRef(null);
    const fileRef = useRef(null);

    const [postid, setPostId] = useState("");

    const getPostSelector = useSelector((state) => state.post);
    const dispatch = useDispatch();

    // actions
    const getPostAction = (postid) => dispatch(getPosts(postid));
    const updatePostAction = (postid, post) => dispatch(updatePost(postid, post));
    const deletePostAction = (postid, fileref) => dispatch(deletePost(postid, fileref));

    //botones
    let currentPost;
    let editButton;
    let deleteButton;


    useEffect(() => {
        setTimer(true);
        // esto retorna el id que tenemos en la url
        setPostId(props.match.params.id);
        getPostAction(props.match.params.id);

        firebase.getUserState().then(user => {   
                setUserState(user);
        });

        setTimeout(() => setTimer(false), 1000); 

    }, []);

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />
    }

    // subirr

    const updateCurrentPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);
        const post = {
            id: postid,
            content: contentRef.current.value,
        }

        if(fileRef.current.files.length > 0){
            post["cover"] = fileRef.current.files[0];
            post["oldcover"] = getPostSelector.post.fileref; 
        }

        await updatePostAction(postid, post);
            setIsBusy(false);
            setRedirect(true);
        }
    
    // editar

    const editPost = () => {
        setDefaultContent(getPostSelector.post.content);
        setFileRef(getPostSelector.post.fileref);
        setEditMode(!editMode);
    }

    // eliminar 
 
    const deleteCurrentPost = async() => {
        try{
            await deletePostAction(postid, fileref);
            setRedirect(true);
        }catch(deleteError){
            console.log(deleteError);
        }
    } 

    let updateForm;
    if(editMode){
        if((logInSelector.user.hasOwnProperty("user")) || (signInSelector.user.hasOwnProperty("user")) || (userState != null && isBusy === false)) {
            deleteButton = <button className="delete" onClick={(e) => deleteCurrentPost()}>Delete Post</button>
        }
        if(isBusy){
            updateForm = <div className="processing">
                            <p>pro ce san doooo...</p>
                            <div className="loader">Cargando...</div>
                        </div>

        }else{
            updateForm = <React.Fragment>
                            <form className="editForm" onSubmit={updateCurrentPost}>
                            <p>Editar post</p>

                            <label htmlFor="content"> Escribe aqui también:</label>
                            <textarea name="content" ref={contentRef} defaultValue={defaultContent}></textarea>

                            <label htmlFor="cover" className="cover">Cover</label>
                            <input type="file" ref={fileRef}/>

                            <input type="submit" value="update post"/>
                            </form>
                        </React.Fragment>
        }
    }

    if(timer){
        currentPost = <div className="loader">Cargando..</div>
    }else{
        if(logInSelector.user.hasOwnProperty("user") || signInSelector.user.hasOwnProperty("user") || userState != 
        null) {
            editButton = <button className="edit" onClick={(e) => editPost() }>Editar </button>
        }

        currentPost = 
             <div className="single">
                <img src={getPostSelector.post.cover}  alt=""/>
                <p>{getPostSelector.post.content}</p>          
                    {editButton}
                    {updateForm}
                    {deleteButton}
                </div>     
    }

    return (
        <React.Fragment>
            {currentPost}
        </React.Fragment>
    )
}

export default Post;
