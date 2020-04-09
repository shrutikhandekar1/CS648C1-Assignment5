  
import React from 'react';
import { Route } from 'react-router-dom';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
import ProductDetail from './ProductDetail.jsx';

export default class ProductList extends React.Component {
    constructor() {
      super();
      this.state = { products: [] };
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
        this.setState({ products: data.productList });
      }
    }
  
    async createProduct(product) {
      const query = `mutation productAdd($product: ProductInput!) {
        productAdd(product: $product) {
          id
        }
      }`;
  
  
      const data = await graphQLFetch(query, { product });
      if (data) {
        this.loadData();
      }
    }
  
    render() {
      console.log("Product List")
      const { products } = this.state;
      const { match } = this.props;
      console.log("{`${match.path}/:id`}");
      return (
        <React.Fragment>
          <h1>My Company Inventory</h1>
          <h3>Showing all available products</h3>
          <hr />
          <ProductTable productList={products} />
          <h3>Add a new product to the inventory</h3>
          <hr />
          <ProductAdd createProduct={this.createProduct} />
          <hr />
          <Route path={`${match.path}/:id`} component={ProductDetail} />
        </React.Fragment>
        
      );
    }
  }