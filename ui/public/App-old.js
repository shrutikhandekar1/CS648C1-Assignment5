/* eslint linebreak-style: ["error", "windows"] */

/* eslint "react/react-in-jsx-scope": "off" */

/* globals React ReactDOM */

/* eslint "react/jsx-no-undef": "off" */

/* eslint "react/no-multi-comp": "off" */

/* eslint "no-alert": "off" */

/* eslint max-classes-per-file: off */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import Edit from 'Edit.jsx';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'; // import { Link } from 'react-router-dom';

import Page from './Page.jsx';
ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}

function ProductTable({
  productList
}) {
  const productRows = productList.map(product => React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"), React.createElement("th", null, "Edit"))), React.createElement("tbody", null, productRows));
}

function ProductRow({
  product
}) {
  return React.createElement("tr", null, React.createElement("td", null, product.productName), React.createElement("td", null, `$${product.price}`), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
    href: product.image
  }, "view")));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.priceRef = React.createRef();
    this.state = {
      defaultPrice: '$',
      categoryValue: '',
      URL: [{
        SHIRTS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
        JEANS: 'https://www.istockphoto.com/photo/blue-jeans-isolated-with-clipping-path-gm600373506-103229995',
        JACKETS: 'https://www.istockphoto.com/photo/black-hoodie-mock-up-gm695933044-128721993',
        SWEATERS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
        ACCESSORIES: 'https://www.shutterstock.com/image-vector/hair-accessories-woman-items-stylist-salon-1451306021'
      }],
      editLink: "edit"
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
      image: form.image.value
    };
    const {
      createProduct
    } = this.props;
    createProduct(product);
    form.productName.value = '';
    form.category.value = '';
    this.setState({
      defaultPrice: '$',
      URL: [{
        SHIRTS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
        JEANS: 'https://www.istockphoto.com/photo/blue-jeans-isolated-with-clipping-path-gm600373506-103229995',
        JACKETS: 'https://www.istockphoto.com/photo/black-hoodie-mock-up-gm695933044-128721993',
        SWEATERS: 'https://www.istockphoto.com/photo/formal-shirt-with-button-down-collar-isolated-on-white-gm856917576-141225609',
        ACCESSORIES: 'https://www.shutterstock.com/image-vector/hair-accessories-woman-items-stylist-salon-1451306021'
      }]
    });
  }

  handleChange(e) {
    this.setState({
      defaultPrice: e.target.value
    });
  }

  render() {
    let btnClass = ['btn', 'clearfix'];
    btnClass = btnClass.join(' ');
    const {
      defaultPrice
    } = this.state;
    const {
      categoryValue
    } = this.state;
    const {
      URL
    } = this.state;
    return React.createElement("div", null, React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit,
      className: "form"
    }, React.createElement("div", {
      className: "div1"
    }, "Category", React.createElement("br", null), React.createElement("select", {
      name: "category",
      className: "selectBox",
      onChange: e => this.setState({
        categoryValue: e.target.value
      })
    }, React.createElement("option", {
      "aria-label": "None",
      value: ""
    }), React.createElement("option", {
      "aria-label": "shirts",
      value: "SHIRTS"
    }, "SHIRTS"), React.createElement("option", {
      "aria-label": "shirts",
      value: "JEANS"
    }, "JEANS"), React.createElement("option", {
      "aria-label": "jackets",
      value: "JACKETS"
    }, "JACKETS"), React.createElement("option", {
      "aria-label": "sweaters",
      value: "SWEATERS"
    }, "SWEATERS"), React.createElement("option", {
      "aria-label": "accessories",
      value: "ACCESSORIES"
    }, "ACCESSORIES")), React.createElement("br", null), React.createElement("br", null), "Product Name", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "productName"
    }), React.createElement("br", null), React.createElement("br", null)), React.createElement("div", {
      className: "div2"
    }, "Price Per Unit", React.createElement("br", null), React.createElement("input", {
      ref: this.priceRef,
      type: "text",
      name: "price",
      onChange: this.handleChange,
      value: defaultPrice
    }), React.createElement("br", null), React.createElement("br", null), "Image URL", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "image",
      defaultValue: URL[0][categoryValue] || ''
    }), React.createElement("br", null), React.createElement("br", null)), React.createElement("button", {
      type: "submit",
      className: btnClass
    }, "Add Product")));
  }

}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(`${window.ENV.UI_API_ENDPOINT}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return null;
  }
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList {
        id productName price category image
      }
    }`;
    const data = await graphQLFetch(query);

    if (data) {
      this.setState({
        products: data.productList
      });
    }
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInput!) {
      productAdd(product: $product) {
        id
      }
    }`;
    const data = await graphQLFetch(query, {
      product
    });

    if (data) {
      this.loadData();
    }
  }

  render() {
    const {
      products
    } = this.state;
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement("h3", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      productList: products
    }), React.createElement("h3", null, "Add a new product to the inventory"), React.createElement("hr", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));