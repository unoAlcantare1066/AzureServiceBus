import React, { Component } from 'react';
import axios from 'axios';
import Item from './components/Item/Item';
import './App.scss';

class App extends Component {
  state = {
    data: {},
    error: false
  }

  componentDidMount() {
    axios.get('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json')
      .then(response => {
        this.setState({data: response.data})
      })
      .catch(error =>  {
        this.setState({error: true})
      });
  }

  render() {
    let products = <p>Something went wrong.</p>;
    let subtotal, discounted;

    if (this.state.data.cart === undefined) {
      products = <p>Loading...</p>;

      subtotal = 'Getting subtotal...';

      discounted = 'Getting discount...';
    } else if (!this.state.error) {
      products = this.state.data.cart.products.map(product => {
        return <Item key={product.id} id={product.id} />
      });

      subtotal = this.state.data.cart.products.map(product => {
        return product.quantity * product.price;
      }).reduce((acc, cur) => acc + cur).toFixed(2);

      discounted = this.state.data.cart.products.map(product => {
        return product.quantity * product.credit_coupon_price;
      }).reduce((acc, cur) => acc + cur).toFixed(2);
    }

    return (
      <div className="App">
        <section className="Order">
          <p>Subtotal: {subtotal}</p>
          <p className="Order__discounted">Sale Price: {discounted}</p>
        </section>
        <section className="Products">
          {products}
        </section>
      </div>
    );
  }
}

export default App;
