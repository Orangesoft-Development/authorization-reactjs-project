import React from 'react';
import './index.scss';
import classNames from 'classnames';

const TextField = ({
  className, type = 'text', center, fullWidth, name, autoComplete = false,
  placeholder = 'Example', value, onChange, onBlur, error
}) => {
  const classes = classNames('custom-input', {
    [className]: !!className,
    'center': center,
    'full-width': fullWidth,
    'error': error
  });
  return <input className={classes} name={name} autoComplete={autoComplete}
    type={type} value={value} onChange={onChange} onBlur={onBlur}
    placeholder={placeholder}
  />;
};

export default React.memo(TextField);