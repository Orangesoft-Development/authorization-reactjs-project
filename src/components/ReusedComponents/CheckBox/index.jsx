import React from 'react';
import './index.scss';
import classNames from 'classnames';

const CheckBox = ({
  className, id, label = 'Example', center, value, onChange
}) => {
  const classes = classNames('custom-checkbox', {
    [className]: !!className,
    'center': !!center
  });
  return <div className={classes}>
    <input id={id} type="checkbox" value={value} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>;
};

export default React.memo(CheckBox);