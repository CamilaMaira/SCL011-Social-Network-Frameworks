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

}

export default new Firebase();