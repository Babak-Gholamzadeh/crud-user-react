import React from 'react';
import ReactDom from 'react-dom';

import './ErrorDialog.style.scss';

const ErrorDialog = ({ children }) => {
  return ReactDom.createPortal(
    <div className="error-dialog-wrapper">
      <div className="error-dialog-container">
        <p className="message">
          {typeof children === 'string' ? children : 'Something wrong happend!'}
        </p>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default ErrorDialog;
