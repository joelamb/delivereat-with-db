import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ name, price, id, handleMenuItemClick }) => {
  return (
    <li className="menu__item" onClick={() => handleMenuItemClick(id)}>
      {name}
      <span className="item__price">£{price.toFixed(2)}</span>
    </li>
  );
};

MenuItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired
};

export default MenuItem;
