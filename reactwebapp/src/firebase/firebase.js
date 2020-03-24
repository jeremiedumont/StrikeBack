import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDx3nx1MYIjSgWoe0_XKi6Pt-YWsjxuNaM",
    authDomain: "strikeback-a3503.firebaseapp.com",
    databaseURL: "https://strikeback-a3503.firebaseio.com",
    projectId: "strikeback-a3503",
    storageBucket: "strikeback-a3503.appspot.com",
    messagingSenderId: "1092210670490",
    appId: "1:1092210670490:web:f4a19c38f449d729bf1823",
    measurementId: "G-5NVEKETS9P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
//firebase.analytics();
const storage = firebase.storage()

export {
    storage, firebase as default
}