import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyCQ8EF3Tst7rhjO2x1FZzWKLe5Rls7rW3o",
    authDomain: "ceapp-5e124.firebaseapp.com",
    databaseURL: "https://ceapp-5e124.firebaseio.com",
    projectId: "ceapp-5e124",
    storageBucket: "ceapp-5e124.appspot.com",
    messagingSenderId: "451980652087",
    appId: "1:451980652087:web:33033dfe006499be3fd9b2"
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
            content: post.content,
            cover: downloadURL,
            fileref: fileRef
        }

        const firebasePost = await firebase.firestore().collection("posts").add(newPost).catch(err => {
            console.log(err)
        });

        // este post tiene la respuesta de la creacion de un nuevo post
        return firebasePost;

    }

}

export default new Firebase();