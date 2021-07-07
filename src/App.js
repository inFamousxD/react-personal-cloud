import './App.css';

import Navigation from './components/navbar/Navigation';
import Dash from './components/home/Dash';
import React from 'react';

import Notes from './components/notes/Notes';

function App() {
  const [expandNavbar, setExpandNavbar] = React.useState(true);
  const [selected, setSelected] = React.useState(-1)

  const expandNavbarHandler = (e) => {
    setExpandNavbar(e);
  }

  return (
      <div className="App">
        <Navigation expandNavbar={expandNavbar} expandNavbarHandler={expandNavbarHandler} setSelected={setSelected}/>
        <Dash expandNavbarHandler={expandNavbarHandler} selected={selected} setSelected={setSelected}/>
        {
          selected === 0 && <Notes/>
        }
      </div>
  );
}

export default App;
