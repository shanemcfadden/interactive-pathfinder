import { type PropsWithChildren } from 'react';

const Button = ({
  children,
  onClickFn,
  extraClassName = '',
  disabled = false,
}: PropsWithChildren<{
  onClickFn: () => void;
  extraClassName?: string;
  disabled?: boolean;
}>) => (
  <button
    className={'dashboard__button ' + extraClassName}
    type="button"
    onClick={onClickFn}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
