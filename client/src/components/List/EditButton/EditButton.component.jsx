import React from 'react';
import {Link } from 'react-router-dom';
import editIcon from '../../../assets/images/edit-icon.svg';

import './EditButton.style.scss';

const EditButton = ({to}) => (
  <Link to={to} className="edit-button">
    <img src={editIcon} />
  </Link>
);

export default EditButton;
