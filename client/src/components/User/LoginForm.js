import React, { useState } from 'react';
import { formButtonStyle, inputStyle, registrationForm } from '../../styles/styles';
import { loginUser } from '../../api/api';

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(email);
      setMessage('Přihlášení bylo úspěšné');
      setTimeout(() => {
        setMessage('');
        onLoginSuccess(user);
        onClose();
      }, 1000);
    } catch (error) {
      setMessage( error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={registrationForm}>
        <input
          style={inputStyle}
          placeholder='E-mail'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <button style={formButtonStyle} type="submit">
        Přihlásit se
      </button>
      <button style={formButtonStyle} onClick={onClose}>
        Zrušit
      </button>
      {message && <div style={{ color: message.includes('úspěšné') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
};

export default LoginForm;