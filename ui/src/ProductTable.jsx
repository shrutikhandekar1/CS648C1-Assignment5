  
import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

export default function ProductTable({ productList, deleteProduct }) {
    const productRows = productList.map((product, index) => (
      <ProductRow 
        key={product.id} 
        product={product}
        deleteProduct={deleteProduct}
        index={index} />
    ));

    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    );
  }
  
  
  const ProductRow = withRouter(({ product, location: { search }, deleteProduct, index }) => {
    const selectLocation = { pathname: `/productList/${product.id}`, search };

    return (
      <tr>
        <td>{product.productName}</td>
        <td>{`$${product.price}`}</td>
        <td>{product.category}</td>
        <td><Link to={`/image/${product.id}`}>View</Link></td>
        <td>
          <Link to={`/edit/${product.id}`}>Edit</Link>  {' | '}
          <button type="button" onClick={() => { deleteProduct(index); }}>
            Delete
          </button>
        </td>
      </tr>
    );
  });
  