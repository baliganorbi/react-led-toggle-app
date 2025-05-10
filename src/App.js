import { useState } from 'react';
import ledOn from './assets/led_on.png';
import ledOff from './assets/led_off.png';
import './App.css';

function App() {
  const [isLedOn, setIsLedOn] = useState(false);
  const [serverUrl, setServerUrl] = useState('http://192.168.111.192');

  const toggleLed = async () => {
    const newState = !isLedOn;
    setIsLedOn(newState);
    const newStateText = newState ? 'ON' : 'OFF';
    const url = `${serverUrl}/?LED=${newStateText}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState ? 'ON' : 'OFF' }),
      });

      if (!response.ok) {
        console.error('Failed to update LED state on the server');
      }
    } catch (error) {
      console.error('Error while sending request to the server:', error);
    }
  };

  const handleUrlChange = (event) => {
    setServerUrl(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={isLedOn ? ledOn : ledOff} className="App-logo" alt="LED" />
        <p>The LED is currently {isLedOn ? 'ON' : 'OFF'}.</p>
        <button onClick={toggleLed} className="App-button">
          Toggle LED
        </button>
        <input
          type="text"
          value={serverUrl}
          onChange={handleUrlChange}
          placeholder="Enter server URL"
          className="App-input"
        />
      </header>
    </div>
  );
}

export default App;
