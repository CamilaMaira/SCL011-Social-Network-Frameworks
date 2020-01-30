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

    // fetch 

    async getPosts(){
        let postArray = [];
        const post = await firebase.firestore().collection("posts").get();
        post.forEach(doc => {
            postArray.push({ id: doc.id, data: doc.data() });
        })

        return postArray;

    }

    // esta promesa tiene un metodo que retorna la informacion de data, const post tiene la promesa
    // este post dentro tiene data

    async getPost(postid){
        const post = await firebase.firestore().collection("post").doc(postid).get(); // promise
        const postData = post.data();
        return postData;
        
    }
  

    // add post 2 firebase

    // parametro post es un objeto, vamos a manejar el upload con storageRef
    // post.cover.name post object tiene un cover propiedad dentro y de ahi sacamos el name
    // vamos a subir postCover con put, postCover es la referencia de lo que vamos a subir
    // fileRef nos dice donde estamos en caso de querer eliminar un file

    async createPost(post){
        //TODO ESTO ES PARA LAS IMAGENES//

        const storageRef = firebase.storage().ref();
        // hijo dentro del storage
        const storageChild = storageRef.child(post.cover.name)
        //(post.cover ? post.cover.name:"0");
        const postCover = await storageChild.put(post.cover);
        const downloadURL = await storageChild.getDownloadURL(); // URL
        const fileRef = postCover.ref.location.path; // actual path* */

        // objeto que vamos a enviar

        let newPost = {
            content: post.content,
            cover: downloadURL,
            fileref: fileRef
        }

        const firebasePost = await firebase.firestore().collection("posts").add(newPost).catch(err => {
            console.log(err)
        });

        // firebasePost es la respuesta de la creacion de un nuevo post

        return firebasePost;

    }


    // estas funciones van a estar dentro del component post

    async updatePost(postid, postData){
        if(postData["cover"]){
            //referencia a storage
            const storageRef = firebase.storage().ref();
            // child dentro de storage
            const storageChild = storageRef.child(postData.cover.name);
            const postCover = await storageChild.put(postData.cover);
            const downloadURL = await storageChild.getDownloadURL(); // URL
            const fileRef = postCover.ref.location.path; // actual path* 

            // borra la imagen antigua
            await storageRef.child(postData["oldcover"]).delete().catch(err => {
                console.log(err);
            });
            console.log("imagen borrada, ya no hay vuelta atras")

            let updatePost = {
                content: postData.content,
                cover: downloadURL,
                fileref: fileRef
            }

            //imagenes

            const post = await firebase.firestore().collection("posts").doc(postid)
            .set(updatePost, {merge:true}).catch(err => {console.log(err)});

            console.log("¡felicitaciones! post actualizado");
            return post;
        } else{

            // datos

            const post = await firebase.firestore().collection("posts").doc(postid)
            .set(postData, {merge:true}).catch(err => {console.log (err)});

            console.log("¡felicitaciones! post actualizado");
            return post;
        }
    }

    async deletePost(postid, fileref){
        const storageRef = firebase.storage().ref();
        console.log("Ref to delete > "+fileref);
        await storageRef.child(fileref).delete().catch(err => console.log(err));
        console.log("imagen eliminada")

        const post = await firebase.firestore().collection("posts").doc(postid)
        .delete().catch(err => {
            console.log(err);
        });

        console.log("post borrado");
        return post;

    }

}

export default new Firebase();