import React, { useState, useEffect } from 'react';

function Welcome({ onSelectGender }) {
  const [showWarning, setShowWarning] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    // Save to local storage for persistence across reloads
    localStorage.setItem('hh_gender', gender);
    onSelectGender(gender);
  };

  return (
    <div className="screen-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
        Bienvenido a<br/>
        <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-red)' }}>Heaven and Hell</span>
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.5' }}>
        La cita para hoy, día 29 de mayo.<br/>
        A las 20:00 es la hora que comienza la cita.
      </p>

      {/* Warning Modal */}
      {showWarning && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="warning-text">⚠️ REGLAS OBLIGATORIAS</h3>
            
            <div style={{ margin: '2rem 0', textAlign: 'left' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-red)', paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>REGLA 1: DRESS CODE</span>
                Toda la ropa y ropa interior debe ser EXCLUSIVAMENTE:<br/>
                <strong style={{ color: '#aaa' }}>NEGRA</strong>, <strong style={{ color: '#fff' }}>BLANCA</strong> o <strong style={{ color: 'var(--accent-red)' }}>ROJA</strong>.
              </p>

              <p style={{ fontSize: '1.2rem', borderLeft: '4px solid var(--accent-red)', paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>REGLA 2: EL TIEMPO</span>
                Coloca inmediatamente una <strong>ALARMA a las 21:50</strong>.
              </p>
            </div>

            <button className="btn btn-primary" onClick={() => setShowWarning(false)}>
              ACEPTAR
            </button>
          </div>
        </div>
      )}

      {/* Gender Selection */}
      {!showWarning && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1s ease-out', marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontFamily: 'var(--font-sans)', fontWeight: '300', letterSpacing: '4px', textAlign: 'center' }}>
            SELECCIONA TU <br/>
            <strong style={{ color: 'var(--accent-red)', fontWeight: '600' }}>GÉNERO</strong>
          </h2>
          <div className="selection-grid">
            <div className="selection-card" onClick={() => handleGenderSelect('woman')}>
              <h3>Ella</h3>
              <span style={{ fontSize: '2rem' }}>👠</span>
            </div>
            <div className="selection-card" onClick={() => handleGenderSelect('man')}>
              <h3>Él</h3>
              <span style={{ fontSize: '2rem' }}>👔</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
