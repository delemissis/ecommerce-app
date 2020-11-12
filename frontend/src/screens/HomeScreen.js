import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {
  const category = props.match.params.id ? props.match.params.id : '';
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const productList = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder));
    return () => {
      //
    };
  }, [dispatch, category]);
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, e.target.value));
  };
  const { loading, products, error } = productList;
  return (
    <div className="content">
      {category
        && (
          <h1>
            {category}
          </h1>
        )}
      <ul className="filter">
        <li>
          <form onSubmit={searchHandler}>
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

        </li>
        <li>
          Sort by
          {' '}
          <select value={sortOrder} onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>

      {loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
        : products.length === 0 ? (
          <div className="empty-list">
            There is no products.
          </div>
        )
          : (
            <ul className="products">
              {products.map((product, index) => (
                <Product index={index} key={product._id} {...product} />
          ))}
            </ul>
          )}
    </div>
  );
}
export default HomeScreen;
