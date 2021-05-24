import React from 'react';
import {Link} from 'react-router-dom';
import addIcon from '../../assets/images/add-icon.svg';

import './AddButton.style.scss';

const AddButton = ({ to }) => (
  <Link className="add-button" to="/create-user" title="Add new user">
    <img src={addIcon} />
  </Link>
);

export default AddButton;
