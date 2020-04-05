
import React from 'react';
import PropTypes from 'prop-types';

export default class ProductAdd extends React.Component {
    constructor() {
      super();
      this.priceRef = React.createRef();
      this.state = {
        defaultPrice: '$',
        categoryValue: '',
        URL: [
          {
            SHIRTS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
            JEANS: 'https://www.istockphoto.com/photo/blue-jeans-isolated-with-clipping-path-gm600373506-103229995',
            JACKETS: 'https://www.istockphoto.com/photo/black-hoodie-mock-up-gm695933044-128721993',
            SWEATERS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
            ACCESSORIES: 'https://www.shutterstock.com/image-vector/hair-accessories-woman-items-stylist-salon-1451306021',
          },
        ],
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const product = {
        productName: form.productName.value,
        category: form.category.value,
        price: parseFloat(form.price.value.replace(/\$/g, '')),
        image: form.image.value,
      };
      const { createProduct } = this.props;
      createProduct(product);
  
      form.productName.value = '';
      form.category.value = '';
      this.setState({
        defaultPrice: '$',
        URL: [
          {
            SHIRTS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
            JEANS: 'https://www.istockphoto.com/photo/blue-jeans-isolated-with-clipping-path-gm600373506-103229995',
            JACKETS: 'https://www.istockphoto.com/photo/black-hoodie-mock-up-gm695933044-128721993',
            SWEATERS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
            ACCESSORIES: 'https://www.shutterstock.com/image-vector/hair-accessories-woman-items-stylist-salon-1451306021',
          },
        ],
      });
    }
  
    handleChange(e) {
      this.setState({ defaultPrice: e.target.value });
    }
  
    render() {
      let btnClass = [
        'btn',
        'clearfix',
      ];
      btnClass = btnClass.join(' ');
      const { defaultPrice } = this.state;
      const { categoryValue } = this.state;
      const { URL } = this.state;
  
      return (
        <div>
          <form name="productAdd" onSubmit={this.handleSubmit} className="form">
            <div className="div1">
              Category
              <br />
              <select name="category" className="selectBox" onChange={(e) => this.setState({ categoryValue: e.target.value })}>
                <option aria-label="None" value="" />
                <option aria-label="shirts" value="SHIRTS">SHIRTS</option>
                <option aria-label="shirts" value="JEANS">JEANS</option>
                <option aria-label="jackets" value="JACKETS">JACKETS</option>
                <option aria-label="sweaters" value="SWEATERS">SWEATERS</option>
                <option aria-label="accessories" value="ACCESSORIES">ACCESSORIES</option>
              </select>
              <br />
              <br />
              Product Name
              <br />
              <input type="text" name="productName" />
              <br />
              <br />
            </div>
            <div className="div2">
              Price Per Unit
              <br />
              <input ref={this.priceRef} type="text" name="price" onChange={this.handleChange} value={defaultPrice} />
              <br />
              <br />
              Image URL
              <br />
              <input type="text" name="image" defaultValue={URL[0][categoryValue] || ''} />
              <br />
              <br />
            </div>
            <button type="submit" className={btnClass}>Add Product</button>
          </form>
        </div>
      );
    }
  }
  