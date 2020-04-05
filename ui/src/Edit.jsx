import React from 'react';

function Edit() {
    return (
        <div>
            <h1>Edit Page</h1>
            const form = document.forms.productAdd;
    const product = {
      productName: form.productName.value,
      category: form.category.value,
      price: parseFloat(form.price.value.replace(/\$/g, '')),
      image: form.image.value,
      edit: 
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
        </div>
    );
}

export default Edit;