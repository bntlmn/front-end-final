import React from 'react';
import './App.css';
import Geolocation from './components/Geolocation';

function App() {
  return (
    <div id="root">
      <header className="App-header">
        <h1 className="App-title">IP Geolocation Tool</h1>
        <p className="App-description">A simple tool to fetch geolocation data including weather and air quality index from an IP address.</p>
      </header>
      <div className="App-body">
        <Geolocation />
      </div>
    </div>
  );
}

export default App;