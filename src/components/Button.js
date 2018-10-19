import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { name, className, onClick, icon, children } = props;
  return (
    <button name={name} className={className} onClick={onClick}>
      {icon ? <i className={`fas fa-${icon}-circle`} /> : children}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
