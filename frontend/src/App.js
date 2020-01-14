import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShipppingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlacceOrderScreen from './screens/PlaceOrderScreen';
import { listCategories } from './actions/categoryActions';
import LoadingBox from './components/LoadingBox';
import ErrorBox from './components/ErrorBox';


function App() {
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios('/api/categories');
  //       setCategories(result.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const categoryList = useSelector((state) => state.categoryList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { categories, loading, error } = categoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    return () => {
      //
    };
  }, []);

  const openSidebar = () => document.querySelector('.sidebar').classList.add('open');
  const closeSidebar = () => document.querySelector('.sidebar').classList.remove('open');

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button type="button" onClick={openSidebar}>&#9776;</button>
            <Link to="/">amazona</Link>
          </div>
          <div>
            <Link className="header-link" to="/cart">
              Cart
            </Link>
            {userInfo
              ? (
                <Link className="header-link" to="/profile">
                  {userInfo.name}
                </Link>
              )
              : <Link className="header-link" to="/signin"> Sign in </Link>}

          </div>
        </header>
        <aside className="sidebar">
          <ul className="categories">
            <li>
              <h3>Shopping Categories</h3>
              <button type="button" className="sidebar-menu-close" onClick={closeSidebar}>
                x
              </button>
            </li>
            {loading
              ? <li><LoadingBox /></li> : error ? <li><ErrorBox message={error} /></li>
                : categories.length === 0 ? (
                  <li className="empty-list">
                    There is no categories.
                  </li>
                ) : categories.map((x) => (
                  <li key={x._id}>
                    <Link onClick={closeSidebar} to={`/categories/${x.name}`}>{x.name}</Link>
                  </li>
                ))}
          </ul>
        </aside>
        <main onClick={closeSidebar} className="main">
          <Route path="/placeorder" component={PlacceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?/:qty?" component={CartScreen} />
          <Route path="/product/:id" component={DetailsScreen} />
          <Route path="/categories/:id" component={HomeScreen} />
          <Route path="/" exact component={HomeScreen} />
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
