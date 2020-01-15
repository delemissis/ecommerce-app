import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProducts } from '../actions/productActions';

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/amazona';
console.log(mongodbUrl);
function HomeScreen(props) {
  const category = props.match.params.id;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [dispatch, category]);
  const { loading, products, error } = productList;
  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : products.length === 0 ? (
        <div className="empty-list">
          There is no products.
        </div>
      )
        : (
          <div className="content">
            {category
              && (
                <h1>
                  {category}
                </h1>
              )}
            <ul className="products">
              {products.map((product) => (
                <Product key={product._id} {...product} />
              ))}
            </ul>
          </div>
        );
}
export default HomeScreen;
