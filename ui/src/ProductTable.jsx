  
import React from 'react';


export default function ProductTable({ productList }) {
    const productRows = productList.map((product) => (
      <ProductRow key={product.id} product={product} />
    ));
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    );
  }
  
  
  function ProductRow({ product }) {
    return (
      <tr>
        <td>{product.productName}</td>
        <td>{`$${product.price}`}</td>
        <td>{product.category}</td>
        <td><a href={product.image}>view</a></td>
        <td><Link to='/edit'>Edit</Link></td>
      </tr>
    );
  }
  