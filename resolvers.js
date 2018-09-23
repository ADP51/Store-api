const db = require("./db");

process.setMaxListeners(Infinity);


const Query = {
  store: (root, args) => db.stores.get(args.id),
  stores: () => db.stores.list(),
  product: (root, args) => db.products.get(args.id),
  products: () => db.products.list(),
  order: (root, args) => db.orders.get(args.id),
  orders: () => db.orders.list(),
  lineitem: (root, args) => db.lineitems.get(args.id),
  lineitems: () => db.lineitems.list()
};

//if this was a real api we should probably use some sort of body validation
const Mutation = {
  // crud for Store
  createStore: (root, {name}) => {
    return db.stores.create({name});
  },
  updateStore: (root, {name, id}) => {
    return db.stores.update({name, id});
  },
  deleteStore: (root, {id}) => {
    db.stores.delete(id);
  },
  // crud for Product
  createProduct: (root, {input}) => {
    return db.products.create({input});
  },
  updateProduct: (root, {input}) => {
    return db.products.update({input});
  },
  deleteProduct: (root, {id}) => {
    db.products.delete(id);
  },
  // crud for Order
  createOrder: (root, {input}) =>{
    return db.orders.create({input});
  },
  updateOrder: (root, {input}) => {
    return db.orders.update({input});
  },
  deleteOrder: (root, {id}) => {
    db.orders.delete(id);
  },
  // crud for Lineitem
  createLineitem: (root, {input}) => {
    return db.lineitems.create({input});
  },
  updateLineitem: (root, {input}) => {
    return db.lineitems.update({input});
  },
  deleteLineitem: (root, {id}) => {
    db.lineitems.delete(id);
  }
}

const Store = {
  products: (store) => db.products.list()
    .filter((product) => product.storeId === store.id),
  orders: (store) => db.orders.list()
    .filter((order) => order.storeId === store.id)
};

const Product = {
  store: (product) => db.stores.get(product.storeId),
  lineitems: (order) => db.lineitems.list()
  .filter((lineitem) => lineitem.orderId === order.id)
};

const Order = {
  store: (order) => db.stores.get(order.storeId),
  lineitems: (order) => db.lineitems.list()
  .filter((lineitem) => lineitem.orderId === order.id)
};

const Lineitem = {
  order: (lineitem) => db.orders.get(lineitem.orderId),
  product: (lineitem) => db.products.get(lineitem.productId)
};

module.exports = {Query, Store, Product, Order, Lineitem, Mutation};
