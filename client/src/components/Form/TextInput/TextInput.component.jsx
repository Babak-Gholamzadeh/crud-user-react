import React from 'react';

import './TextInput.style.scss';

const TextInput = (props) => (
  <div className="text-input-wrapper">
    <label htmlFor={props.name}>
      {props.label}
      <input type="text" id={props.name} {...props}/>
    </label>
  </div>
);

export default TextInput;