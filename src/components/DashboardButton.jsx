import React from 'react';

// const makeDashboardButton = (innerHTML, onClickFn, extraClassName = '') => (
//   <button
//     className={'dashboard__button ' + extraClassName}
//     type="button"
//     onClick={onClickFn}
//   >
//     {innerHTML}
//   </button>
// );
const DashboardButton = ({
  children,
  onClickFn,
  extraClassName = '',
  disabled = false,
}) => (
  <button
    className={'dashboard__button ' + extraClassName}
    type="button"
    onClick={onClickFn}
    disabled={disabled}
  >
    {children}
  </button>
);

export default DashboardButton;
