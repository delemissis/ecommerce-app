import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/ProductScreen';
import OrderDetailsScreen from './screens/OrderScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShipppingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import ErrorBox from './components/ErrorBox';
import AdminProductsScreen from './screens/ProductsScreen';
import AdminOrdersScreen from './screens/OrdersScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { categories, loading, error } = productCategoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, []);
  const openSidebar = () =>
    document.querySelector('.sidebar').classList.add('open');
  const closeSidebar = () =>
    document.querySelector('.sidebar').classList.remove('open');

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button type="button" onClick={openSidebar}>
              &#9776;
            </button>
            <Link to="/">amazona</Link>
          </div>
          <div>
            {cartItems.length !== 0 && (
              <div className="badge">{cartItems.length}</div>
            )}
            <Link className="header-link" to="/cart">
              Cart
            </Link>

            {userInfo ? (
              <>
                <Link className="header-link" to="/profile">
                  {userInfo.name}
                </Link>
                {userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link className="header-link" to="#admin">
                      Admin
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link className="header-link" to="/products">
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link className="header-link" to="/orders">
                          Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link className="header-link" to="/signin">
                {' '}
                Sign in
              </Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <ul className="categories">
            <li>
              <h3>Shopping Categories</h3>
              <button
                type="button"
                className="sidebar-menu-close"
                onClick={closeSidebar}
              >
                x
              </button>
            </li>
            {loading ? (
              <li>
                <LoadingBox />
              </li>
            ) : error ? (
              <li>
                <ErrorBox message={error} />
              </li>
            ) : categories.length === 0 ? (
              <li className="empty-list">There is no categories.</li>
            ) : (
              categories.map((x) => (
                <li key={x}>
                  <Link onClick={closeSidebar} to={`/category/${x}`}>
                    {x}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main onClick={closeSidebar} className="main">
          <PrivateRoute
            userInfo={userInfo}
            path="/shipping"
            component={ShippingScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/payment"
            component={PaymentScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/placeorder"
            component={PlaceOrderScreen}
          />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRoute
            userInfo={userInfo}
            path="/profile"
            component={ProfileScreen}
          />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={DetailsScreen} />
          <PrivateRoute
            userInfo={userInfo}
            path="/order/:id"
            component={OrderDetailsScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/products"
            component={AdminProductsScreen}
          />
          <PrivateRoute
            userInfo={userInfo}
            path="/orders"
            component={AdminOrdersScreen}
          />
          <Route path="/category/:id" component={HomeScreen} />
          <Route path="/" exact component={HomeScreen} />
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
