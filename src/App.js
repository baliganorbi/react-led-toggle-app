import { useState } from 'react';
import ledOn from './assets/led_on.png';
import ledOff from './assets/led_off.png';
import './App.css';

function App() {
  const [isLedOn, setIsLedOn] = useState(false);

  const toggleLed = async () => {
    const newState = !isLedOn;
    setIsLedOn(newState);

    try {
      const response = await fetch('http://example.com/api/led', {
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={isLedOn ? ledOn : ledOff} className="App-logo" alt="LED" />
        <p>The LED is currently {isLedOn ? 'ON' : 'OFF'}.</p>
        <button onClick={toggleLed} className="App-button">
          Toggle LED
        </button>
      </header>
    </div>
  );
}

export default App;
