import React from 'react';
import './App.css';
import Sidebar from "./Sidebar"


const CATEGORIES = ["Provider name",
  "Date of invoice",
  "Total charge",
  "Location of consumption"]

function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      <Sidebar categories={CATEGORIES} />
      <div className="Content">

      </div>
    </div>
  );
}

export default App;
