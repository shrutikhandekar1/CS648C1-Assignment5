import React from 'react';
import graphQLFetch from './graphQLFetch.js';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id image
      }
    }`;
    
    const id = parseInt(this.props.match.params.id);
    const data = await graphQLFetch(query, { id });

     if (data) {
       const { product } = data;
       product.image = product.image != null ? product.image.toString() : '';
     }
    this.setState({ product: data ? data.product : null, invalidFields: {} });

  }

  render() {
    const { product: { id } } = this.state;

    var { match: { params: { id: propsId } } } = this.props;

    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { product: { image } } = this.state;

    return (
      <React.Fragment>
        <br/>
        <a href={this.state.product.image}>Link to image</a>
        <p>(Unable to display link directly on page due to cors issue.)</p>
      </React.Fragment>
      
    );
  }
}