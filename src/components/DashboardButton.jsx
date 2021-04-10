import React from 'react';

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
