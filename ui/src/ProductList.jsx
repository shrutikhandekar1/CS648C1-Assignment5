  
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
      this.deleteProduct = this.deleteProduct.bind(this);
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
  
    async deleteProduct(index) {
      const query = `mutation productDelete($id: Int!) {
        productDelete(id: $id)
      }`;
      const { products } = this.state;
      const { location: { pathname, search }, history } = this.props;
      const { id } = products[index];
      const data = await graphQLFetch(query, { id });
      if (data && data.productDelete) {
        this.setState((prevState) => {
          const newList = [...prevState.products];
          if (pathname === `/products/${id}`) {
            history.push({ pathname: '/products', search });
          }
          newList.splice(index, 1);
          return { products: newList };
        });
      } else {
        this.loadData();
      }
    }

    render() {
      const { products } = this.state;
      const { match } = this.props;
      
      return (
        <React.Fragment>
          <h1>My Company Inventory</h1>
          <h3>Showing all available products</h3>
          <hr />
          <ProductTable productList={products} deleteProduct={this.deleteProduct}/>
          <h3>Add a new product to the inventory</h3>
          <hr />
          <ProductAdd createProduct={this.createProduct} />
          <hr />
          <Route path={`${match.path}/:id`} component={ProductDetail} />
        </React.Fragment>
        
      );
    }
  }