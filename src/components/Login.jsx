import React, { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Oreo') {
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
