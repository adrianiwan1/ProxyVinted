
import './App.css';
import React, { useState } from 'react';
import MyModal from './LoginModal.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyModal />
      </header>
    </div>
  );
}

export default App;
