import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Order from './Order';
import Basket from './Basket';

import '../styles/app.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      isOrdering: false,
      currentOrderItem: {},
      orderBasket: [],
      hasOrdered: false,
      orderRef: 0
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
    this.addOrderToBasket = this.addOrderToBasket.bind(this);
    this.handleBasketChange = this.handleBasketChange.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.exit = this.exit.bind(this);
  }

  componentDidMount() {
    fetch('/api/menu')
      .then(response => response.json())
      .then(body => {
        this.setState({
          menu: body
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }

  handleMenuItemClick(id) {
    return fetch(`/api/item/${id}`)
      .then(response => response.json())
      .then(body => {
        const item = Object.assign({}, body, {
          price: parseFloat(body.price)
        });
        this.setState({
          hasOrdered: false,
          isOrdering: true,
          currentOrderItem: item
        });
      })
      .catch(error => {
        alert('error');
      });
  }

  closeOrder(history) {
    console.log(history);
    history.goBack();
    this.setState({
      isOrdering: false
    });
  }

  addOrderToBasket(name, quantity, price) {
    const { orderBasket, currentOrderItem } = this.state;
    let newOrderBasket = {};
    const order = { id: currentOrderItem.id, name, quantity, price };
    if (orderBasket.hasOwnProperty(currentOrderItem.id)) {
      const updatedOrder = (orderBasket[currentOrderItem.id].quantity +=
        order.quantity);
      newOrderBasket = Object.assign({}, orderBasket, updatedOrder);
    } else {
      newOrderBasket = Object.assign({}, orderBasket, {
        [currentOrderItem.id]: order
      });
    }
    this.setState({
      isOrdering: false,
      orderBasket: newOrderBasket
    });
  }

  handleBasketChange(e, id) {
    const { orderBasket } = this.state;
    const orderToUpdate = orderBasket[id];
    let updatedOrder = {};

    switch (e.target.name) {
      case 'increase':
        updatedOrder = orderToUpdate.quantity++;
        break;
      case 'decrease':
        if (orderBasket[id].quantity > 1) {
          updatedOrder = orderToUpdate.quantity--;
        }
        break;
    }

    const updatedBasket = Object.assign({}, orderBasket, updatedOrder);
    this.setState({
      orderBasket: updatedBasket
    });
  }

  removeFromBasket(id) {
    const updatedBasket = this.state.orderBasket;
    delete updatedBasket[id];
    this.setState({
      orderBasket: updatedBasket
    });
  }

  submitOrder() {
    const orders = Object.values(this.state.orderBasket).map(item => {
      return { id: item.id, quantity: item.quantity };
    });

    fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ items: orders }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Order response code ${response.status}`);
        }
      })
      .then(data => {
        this.setState({
          currentOrderItem: {},
          orderBasket: {},
          hasOrdered: true,
          orderRef: data.basketId
        });
      })
      .catch(error => {
        // handle the error
      });
  }

  exit() {
    this.setState({
      hasOrdered: false
    });
  }

  render() {
    const {
      menu,
      currentOrderItem,
      isOrdering,
      orderBasket,
      hasOrdered,
      orderRef
    } = this.state;

    const hasBasket = Object.keys(orderBasket).length > 0;

    return (
      <Router>
        <div className="page">
          <h1>Tiffany’s</h1>
          {menu.length > 0 ? (
            <Menu menu={menu} handleMenuItemClick={this.handleMenuItemClick} />
          ) : (
            <p>{menu.error}</p>
          )}
          {isOrdering && (
            <Route
              path="/item/:itemId"
              render={({ history }) => {
                return (
                  <Order
                    key={currentOrderItem.id}
                    currentOrderItem={currentOrderItem}
                    addOrderToBasket={this.addOrderToBasket}
                    closeOrder={this.closeOrder}
                    history={history}
                  />
                );
              }}
            />
          )}
          {hasBasket && (
            <Basket
              basket={orderBasket}
              submitOrder={this.submitOrder}
              handleBasketChange={this.handleBasketChange}
              removeFromBasket={this.removeFromBasket}
            />
          )}
          {hasOrdered && (
            <div className="acknowledge__wrapper">
              <div className="acknowledge">
                <h3>
                  {' '}
                  Thank you for your order (REF: {orderRef}) Enjoy your
                  breakfast!
                </h3>
                <button onClick={() => this.exit()} className="btn btn__submit">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
