import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDFXfVcolC_Z2YASVdDRv3njskcn1j-C4g",
    authDomain: "mycloud-database.firebaseapp.com",
    projectId: "mycloud-database",
    storageBucket: "mycloud-database.appspot.com",
    messagingSenderId: "826969352458",
    appId: "1:826969352458:web:22cf3496afbc2e830b72f3"
};
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectFirestore, projectStorage };