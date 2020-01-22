import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
// import { getDashboard } from '../actions/dashboardActions';

function DashboardScreen() {
  const dispatch = useDispatch();

  // const dashboard = useSelector((state) => state.dashboard);
  // const { loading, data, error } = dashboard;

  useEffect(() =>
    // dispatch(getDashboard());
    () => {
      //
    },
  []);
  return (
    <div className="content content-margined">
      <div>
        <Link to="/admin-products">Products</Link>
      </div>
      <div>
        <Link to="/admin-orders">Orders</Link>
      </div>
    </div>
  );

  // return loading ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
  //     <div className="content content-margined">
  //       <div>
  //         <Link to="/admin-products">Products</Link>
  //       </div>
  //       <div>
  //         <Link to="/admin-orders">Orders</Link>
  //       </div>
  //     </div>
  //   );
}
export default DashboardScreen;
