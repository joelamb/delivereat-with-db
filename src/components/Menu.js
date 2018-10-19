import React, { Fragment } from 'react';
import MenuItem from './MenuItem';
import '../styles/menu.scss';

const Menu = ({ menu, handleMenuItemClick }) => {
  const categories = menu
    .map(item => item.menu)
    .filter((item, i, array) => !(i > array.indexOf(item)));

  return (
    <div className="menu">
      <dl>
        {categories.map(menuCategory => {
          return (
            <Fragment key={menuCategory}>
              <dt className={`menu__${menuCategory}`}>{menuCategory}</dt>
              <dd className={`menu__${menuCategory}__items`}>
                <ul className="menu__list">
                  {menu.filter(item => item.menu == menuCategory).map(item => {
                    const { id, name, price } = item;
                    return (
                      <MenuItem
                        key={id}
                        name={name}
                        price={parseInt(price, 10)}
                        id={id}
                        handleMenuItemClick={handleMenuItemClick}
                      />
                    );
                  })}
                </ul>
              </dd>
            </Fragment>
          );
        })}
      </dl>
    </div>
  );
};

export default Menu;
