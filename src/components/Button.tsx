import { memo, type PropsWithChildren } from 'react';

const Button = ({
  actionType = 'default',
  children,
  disabled = false,
  onClickFn,
}: PropsWithChildren<{
  actionType?: ButtonActionType;
  disabled?: boolean;
  onClickFn: () => void;
}>) => (
    <button
      className={'dashboard__button ' + ACTION_TYPE_TO_CLASS[actionType]}
      type="button"
      onClick={onClickFn}
      disabled={disabled}
    >
      {children}
    </button>
  );

export default memo(Button);

export type ButtonActionType = 'danger' | 'default' | 'submit';

const ACTION_TYPE_TO_CLASS: Record<ButtonActionType, string> = {
  // default button is the default dashboard__button class
  default: '',
  danger: 'dashboard__button--danger',
  submit: 'dashboard__button--submit',
};
