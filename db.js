const { DataStore } = require('notarealdb');

const data = new DataStore('./data');

module.exports = {
  stores: data.collection('stores'),
  products: data.collection('products'),
  orders: data.collection('orders'),
  lineitems: data.collection('lineitems')
};
