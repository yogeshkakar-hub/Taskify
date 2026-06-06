import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, name, id }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id || name}>{label}</label>}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default Input;
