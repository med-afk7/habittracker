import React from 'react';
import './PasswordStrengthChecklist.css';

const PasswordStrengthChecklist = ({ password }) => {
  const criteria = [
    {
      label: 'At least 8 characters',
      isValid: password.length >= 8,
    },
    {
      label: 'At least 1 uppercase letter',
      isValid: /[A-Z]/.test(password),
    },
    {
      label: 'At least 1 lowercase letter',
      isValid: /[a-z]/.test(password),
    },
    {
      label: 'At least 1 number',
      isValid: /[0-9]/.test(password),
    },
    {
      label: 'At least 1 special character',
      isValid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="checklist-container">
      <ul className="checklist">
        {criteria.map((item, index) => (
          <li key={index} className={item.isValid ? 'valid' : 'invalid'}>
            <span className="checkmark">{item.isValid ? '✅' : '❌'}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthChecklist;
