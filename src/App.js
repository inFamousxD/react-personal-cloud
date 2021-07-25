import './App.css';

import Navigation from './components/navbar/Navigation';
import Dash from './components/home/Dash';
import React from 'react';

import Notes from './components/notes/Notes';

import firebase from 'firebase/app';
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

// const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

function App() {
  const [expandNavbar, setExpandNavbar] = React.useState(true);
  const [selected, setSelected] = React.useState(-1)

  const expandNavbarHandler = (e) => {
    setExpandNavbar(e);
  }

  return (
      <div className="App">
        <Navigation expandNavbar={expandNavbar} expandNavbarHandler={expandNavbarHandler} setSelected={setSelected}/>
        <Dash expandNavbarHandler={expandNavbarHandler} selected={selected} setSelected={setSelected} />
        {
          selected === 0 && <Notes projectFirestore={projectFirestore}/>
        }
      </div>
  );
}

export default App;
