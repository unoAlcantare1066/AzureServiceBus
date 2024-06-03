import React, {Component} from 'react';
import axios from 'axios';
import './Item.scss';

class Item extends Component {
    state = {
        product: {},
        error: false
    }

    componentDidMount() {
        const url = `https://prodcat.gopuff.com/api/products?location_id=-1&product_id=${this.props.id}`;
        axios.get(url)
            .then(response => {
                this.setState({product: response.data.products[0]})
            })
            .catch(err => console.log(err.response.data))
    }

    render() {
        let product = <p>Loading...</p>;
        let productImg = 'loading';
        if (!this.state.error) {
            product = this.state.product;
        }
        if (!this.state.product.images) {
            productImg = 'loading';
        } else {
            productImg = this.state.product.images[0].small;
        }
        return (
            <div className="Product">
                <p className="Product__name">{product.name}</p>
                <div className="Description" dangerouslySetInnerHTML={{__html: product.description}}></div>
                <img src={productImg} alt={product.name} />
            </div>
        );
    }
}

export default Item;