import React from 'react';
import Menu from './Menu';
import Order from './Order';
import Basket from './Basket';

import '../styles/app.scss';

class App extends React.Component {
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
    // this.exit = this.exit.bind(this);
  }

  // React code is running in the browser

  // create a fetch to a relative path eg. fetch("/api/menu") not "localhost:8080/api/menu" to the internal api from the endpoints defined in server.js  eg /menu  /order  etc

  componentDidMount() {
    fetch('/api/menu/1')
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
      .then(body =>
        this.setState({
          hasOrdered: false,
          isOrdering: true,
          currentOrderItem: body
        })
      )
      .catch(error => {
        alert('error');
      });
  }

  closeOrder() {
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
    const orders = Object.values(this.state.orderBasket);

    fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ items: orders }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          currentOrderItem: {},
          orderBasket: {},
          hasOrdered: true,
          orderRef: data.basketId
        });
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
      hasOrdered
    } = this.state;

    const hasBasket = Object.keys(orderBasket).length > 0;

    return (
      <div className="page">
        <h1>Tiffany’s</h1>
        {menu.length > 0 ? (
          <Menu menu={menu} handleMenuItemClick={this.handleMenuItemClick} />
        ) : (
          <p>{menu.error}</p>
        )}
        {isOrdering && (
          <Order
            key={currentOrderItem.id}
            currentOrderItem={currentOrderItem}
            addOrderToBasket={this.addOrderToBasket}
            closeOrder={this.closeOrder}
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
                Thank you for your order (REF: {this.state.orderRef}) Enjoy your
                breakfast!
              </h3>
              <button onClick={() => this.exit()} className="btn btn__submit">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
