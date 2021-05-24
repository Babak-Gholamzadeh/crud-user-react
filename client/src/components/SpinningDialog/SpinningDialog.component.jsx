import React from 'react';
import ReactDom from 'react-dom';
import Spinning from '../Spinning/Spinning.component';

import './SpinningDialog.style.scss';

const SpinningDialog = () => {
  return ReactDom.createPortal(
    <div className="spinning-dialog-wrapper">
      <div className="spinning-dialog-container">
        <Spinning />
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default SpinningDialog;
