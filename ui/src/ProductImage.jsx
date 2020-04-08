import React from 'react';

export default function ProductImage({ match }) {
  const { id } = match.params;
  return (
    <h2>{`This is a placeholder for viewing product image${id}`}</h2>
  );
}