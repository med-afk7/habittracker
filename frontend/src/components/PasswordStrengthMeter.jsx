import React from 'react';
import './PasswordStrengthMeter.css';

const getStrength = (password) => {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { label: 'Weak', color: '#e74c3c', level: 1 };
  if (strength === 3 || strength === 4) return { label: 'Medium', color: '#f1c40f', level: 2 };
  return { label: 'Strong', color: '#2ecc71', level: 3 };
};

const PasswordStrengthMeter = ({ password }) => {
  const { label, color, level } = getStrength(password);

  return (
    <div className="strength-meter">
      <div className="strength-bar">
        <div className={`bar level-${level}`} style={{ backgroundColor: color, width: `${(level / 3) * 100}%` }} />
      </div>
      {password && <p className="strength-label" style={{ color }}>{label}</p>}
    </div>
  );
};

export default PasswordStrengthMeter;
