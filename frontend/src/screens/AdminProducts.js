import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProducts, saveProduct } from '../actions/productActions';

function AdminProductsScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const showModal = (product) => {
    setId(product.id);
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setModalVisible(true);
  };
  const deleteHandler = (product) => {
    // dispatch(deleteProduct(product._id));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id, name, image, price, category, countInStock,
    }));
  };
  const productList = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);
  const { loading, products, error } = productList;
  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
      <div className="content content-margined">
        <h2>Products</h2>
        {modalVisible
          && (
            <div className="modal">

              <h3>Create Product</h3>
              <form onSubmit={submitHandler}>
                <ul className="form-container">
                  <li>
                    <label htmlFor="name">
                      Name
                    </label>
                    <input name="name" id="name" value={name} onChange={(e) => { setName(e.target.value); }} />
                  </li>
                  <li>
                    <label htmlFor="image">
                      Image
                    </label>
                    <input name="image" id="image" value={image} onChange={(e) => { setImage(e.target.value); }} />
                  </li>
                  <li>
                    <label htmlFor="name">
                      Price
                    </label>
                    <input name="price" id="price" value={price} onChange={(e) => { setPrice(e.target.value); }} />
                  </li>
                  <li>
                    <label htmlFor="category">
                      Category
                    </label>
                    <input name="category" id="category" value={category} onChange={(e) => { setCategory(e.target.value); }} />
                  </li>
                  <li>
                    <label htmlFor="countInStock">
                      Count In Stock
                    </label>
                    <input name="countInStock" id="countInStock" value={countInStock} onChange={(e) => { setCountInStock(e.target.value); }} />
                  </li>
                  <li>
                    <button type="submit" className="button primary">Create Product</button>
                  </li>
                  <li>
                    <button type="button" onClick={() => { setModalVisible(false); }} className="button">Back</button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        <button type="button" className="button" onClick={() => showModal({})}>Create Product</button>
        {products.length === 0 ? (
          <div className="empty-list">
            There is no products.
          </div>
        )
          : (
            <table>
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Price
                  </th>
                  <th>
                    Category
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>
                      {product.name}
                    </td>
                    <td>
                      {product.price}
                    </td>
                    <td>
                      {product.category}
                    </td>
                    <td>
                      <button type="button" onClick={() => showModal(product)} className="button">Edit</button>
                      <button type="button" onClick={() => deleteHandler(product)} className="button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    );
}
export default AdminProductsScreen;
