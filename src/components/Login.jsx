import React, { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, simple hardcoded password. 
    // In a real app, we might check an env variable or simpler.
    // The user didn't specify a password, so we'll use "50shades" for testing, 
    // but allow anything that has > 3 chars for now until they decide.
    if (password.length >= 3) {
      onLogin();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="screen-container">
      <h1 className="title">Heaven <span>and</span> Hell</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input 
          type="password" 
          className="input-field" 
          placeholder="Contraseña secreta" 
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
        />
        <button type="submit" className="btn">Entrar</button>
        <div className="error-msg">{error}</div>
      </form>
    </div>
  );
}

export default Login;
