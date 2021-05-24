import React from 'react';
import deleteIcon from '../../../assets/images/delete-icon.svg';

import './DeleteButton.style.scss';

const DeleteButton = ({onDelete}) => (
  <button onClick={onDelete} className="delete-button">
    <img src={deleteIcon} />
  </button>
);

export default DeleteButton;
