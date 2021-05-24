import React from 'react';
import ReactDom from 'react-dom';

import './ConfirmDialog.style.scss';

const ConfirmDialog = ({ isOpen, handleClose, hanldeConfirm }) => {
  const closeDialogByClickOutside = (e) => {
    if (e.target.className === 'confirm-dialog-wrapper') handleClose();
  };

  return (
    isOpen &&
    ReactDom.createPortal(
      <div className="confirm-dialog-wrapper" onClick={closeDialogByClickOutside}>
        <div className="confirm-dialog-container">
          <p className="description">Are you sure?</p>
          <button className="dialog-button cancel-button" onClick={handleClose}>
            cancel
          </button>
          <button
            className="dialog-button confirm-button"
            onClick={hanldeConfirm}
          >
            ok
          </button>
        </div>
      </div>,
      document.getElementById('portal')
    )
  );
};

export default ConfirmDialog;
