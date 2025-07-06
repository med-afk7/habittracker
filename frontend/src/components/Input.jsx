import React from 'react';
import './input.css';

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="input-wrapper">
      {Icon && (
        <div className="input-icon">
          <Icon size={20} />
        </div>
      )}
      <input className="input-field" {...props} />
    </div>
  );
};

export default Input;
