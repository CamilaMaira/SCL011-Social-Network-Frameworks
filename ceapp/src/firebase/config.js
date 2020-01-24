import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyAKQ4AJj4kQ0mhJ7SNTDrSoIHx2LCzm_zI",
    authDomain: "scl011-ceapp.firebaseapp.com",
    databaseURL: "https://scl011-ceapp.firebaseio.com",
    projectId: "scl011-ceapp",
    storageBucket: "scl011-ceapp.appspot.com",
    messagingSenderId: "784056641834",
    appId: "1:784056641834:web:554987e8b4b4ffa11c5653"
}

class Firebase {
    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

// sign in 
    async signin(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
        });

        return user;
    }

// log in 

    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
        })

        return user;
    }

// logout 

    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
        });

        return logout;
    }

    async getUserState(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }


    // add post 2 firebase

    // parametro post es un objeto, vamos a manejar el upload con storageRef
    // post.cover.name post object tiene un cover propiedad dentro y de ahi sacamos el name
    // vamos a subir postCover con put, postCover es la referencia de lo que vamos a subir
    // fileRef nos dice donde estamos en caso de querer eliminar un file

    async createPost(post){
        const storageRef = firebase.storage().ref();
        const storageChild = storageRef.child(post.cover.name);
        const postCover = await storageChild.put(post.cover);
        const downloadURL = await storageChild.getDownloadURL(); // URL
        const fileRef = postCover.ref.location.path; // actual path*

        // objeto que vamos a enviar
        let newPost = {
            title: post.title,
            content: post.content,
            cover: downloadURL,
            fileref: fileRef
        }

        const firebasePost = await firebase.firestore().collection("post").add(newPost).catch(err => {
            console.log(err)
        });

        // este post tiene la respuesta de la creacion de un nuevo post
        return firebasePost;

    }

}

export default new Firebase();