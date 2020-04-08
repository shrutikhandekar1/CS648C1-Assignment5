  
import React from 'react';
import { Link } from 'react-router-dom';

import graphQLFetch from './graphQLFetch.js';

export default class ProductEdit extends React.Component {
  constructor() {

    super();
    this.state = {
      product: {},
    };
    console.log("ProductEdit 1");
    this.onChange = this.onChange.bind(this);
    console.log("ProductEdit 2");
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("ProductEdit 3");
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;

    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event) {
    console.log(onChange);
    const { name, value } = event.target;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }
  
  handleSubmit(e) {
    console.log(handleSubmit);
    e.preventDefault();
    const { product } = this.state;
    console.log(product); // eslint-disable-line no-console
  }
  
  async loadData() {
    console.log("loadData");
    const query = `query product($id: Int!) {
      product(id: $id) {
        id productName price category image
      }
    }`;
    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });

    if (data) {
      const { product } = data;
      product.productName = product.productName ? product.productName.toString() : '';
      product.price = product.price != null ? product.price.toString() : '';
      product.category = product.category != null ? product.category.toString() : '';
      product.image = product.image != null ? product.image.toString() : '';
      this.setState({ product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    console.log("render");
    const { product: { id } } = this.state;
    var { match: { params: { id: propsId } } } = this.props;

    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { product: { productName, price, category, image } } = this.state;
    console.log("render done");
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing product: ${id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>ProductName:</td>
              <td>{productName.toString()}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <input
                  name="price"
                  value={price}
                  onChange={this.onChange}
                />
            </tr>
            <tr>
              <td>Category:</td>
              <td>
              <select name="category" className="selectBox" onChange={(e) => this.setState({ categoryValue: e.target.value })}>
                <option aria-label="None" value="" />
                <option aria-label="shirts" value="SHIRTS">SHIRTS</option>
                <option aria-label="shirts" value="JEANS">JEANS</option>
                <option aria-label="jackets" value="JACKETS">JACKETS</option>
                <option aria-label="sweaters" value="SWEATERS">SWEATERS</option>
                <option aria-label="accessories" value="ACCESSORIES">ACCESSORIES</option>
              </select>
              </td>
            </tr>
            <tr>
              <td>Image:</td>
              <td>
                <input
                  name="image"
                  value={image}
                />
              </td>
            </tr>
            <tr>
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
        <Link to={`/edit/${id - 1}`}>Prev</Link>
        {' | '}
        <Link to={`/edit/${id + 1}`}>Next</Link>
      </form>
    );
  }
}