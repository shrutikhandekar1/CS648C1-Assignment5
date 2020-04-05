const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list() {
    const products = await db.collection('products').find({}).toArray();
    return products;
  }

  async function add(_, { product }) {
    const newProduct = { ...product };
    newProduct.id = await getNextSequence('products');
    const result = await db.collection('products').insertOne(newProduct);
    const savedProduct = await db.collection('products')
      .findOne({ _id: result.insertedId });
    return savedProduct;
  }

  module.exports = { list, add };