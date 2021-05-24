import React from 'react';

import './Pagination.style.scss';

const Pagination = ({ onPrev, prevIsDisabled, onNext, nextIsDisabled }) => (
  <div className="pagination-wrapper">
    <button
      className="pagination-btn"
      onClick={onPrev}
      disabled={prevIsDisabled}
    >{`<`}</button>
    <button
      className="pagination-btn"
      onClick={onNext}
      disabled={nextIsDisabled}
    >{`>`}</button>
  </div>
);

export default Pagination;
