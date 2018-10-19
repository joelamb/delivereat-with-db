import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from './Button';

import '../styles/order.scss';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this.increaseOrderAmount = this.increaseOrderAmount.bind(this);
    this.decreaseOrderAmount = this.decreaseOrderAmount.bind(this);
  }

  increaseOrderAmount() {
    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  decreaseOrderAmount() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  }

  render() {
    const { currentOrderItem, addOrderToBasket, closeOrder } = this.props;
    const { name, description, price } = currentOrderItem;
    const { quantity } = this.state;

    return (
      <div className="order__wrapper">
        <CSSTransitionGroup
          transitionName="modal"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="order">
            <h3 className="order__item">{name}</h3>
            <p className="order__description">{description}</p>

            <div className="order__meta">
              <Button
                onClick={() => this.decreaseOrderAmount()}
                className="btn btn__decrease"
                name="decrease"
                icon="minus"
              />

              <span className="amount__count">{quantity}</span>

              <Button
                onClick={e => this.increaseOrderAmount(e)}
                className="btn btn__increase"
                name="increase"
                icon="plus"
              />

              <span className="order__cost">
                {' '}
                £{(quantity * parseInt(price, 10)).toFixed(2)}
              </span>
            </div>
            {/* Order action controls */}
            <div className="order__action">
              <Button
                onClick={() => closeOrder()}
                className="btn btn__cancel"
                name="cancel"
              >
                Cancel
              </Button>
              <Button
                className="btn btn__submit"
                onClick={() => addOrderToBasket(name, quantity, price)}
                type="submit"
                name="submit"
              >
                Add to order
              </Button>
            </div>
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}
export default Order;
