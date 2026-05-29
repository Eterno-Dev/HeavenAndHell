import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Welcome from './components/Welcome';
import PhaseManager from './components/PhaseManager';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gender, setGender] = useState(null);
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    // Check if user already logged in / selected gender
    const savedGender = localStorage.getItem('hh_gender');
    const savedDebug = localStorage.getItem('hh_debug') === 'true';
    if (savedGender) {
      setIsLoggedIn(true);
      setGender(savedGender);
      setIsDebugMode(savedDebug);
    }
  }, []);

  const handleLogin = (debugMode) => {
    setIsLoggedIn(true);
    setIsDebugMode(debugMode);
    localStorage.setItem('hh_debug', debugMode);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <>
      <div className="ambient-glow"></div>
      
      {/* Falling petals effect */}
      <div className="petal-container">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="petal" 
            style={{ 
              left: `${Math.random() * 100}vw`, 
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && !gender && <Welcome onSelectGender={handleGenderSelect} />}
      {isLoggedIn && gender && <PhaseManager gender={gender} isDebugMode={isDebugMode} />}

      {/* Debug Reset Button */}
      {isDebugMode && (
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.7rem',
            padding: '5px 10px',
            cursor: 'pointer',
            zIndex: 9999
          }}
        >
          Reset App (Debug)
        </button>
      )}
    </>
  );
}

export default App;
