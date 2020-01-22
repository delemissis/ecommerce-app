import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listOrders, deleteOrder } from '../actions/orderActions';

function AdminOrdersScreen() {
  const dispatch = useDispatch();

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order));
  };

  const orderList = useSelector((state) => state.orderList);
  const orderSave = useSelector((state) => state.orderSave);
  const orderDelete = useSelector((state) => state.orderDelete);

  const { loading, orders, error } = orderList;
  // const { loading: loadingDelete, success: succesDelete, error: errorDelete } = orderDelete;

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, []);
  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
      <div className="content content-margined">
        <div>
          <Link to="/dashboard">‹ Back to dashboard</Link>
          <br />
          <h3>
          Orders
          </h3>
        </div>

        {orders.length === 0 ? (
          <div className="empty-list">
            There is no orders.
          </div>
        )
          : (
            <table>
              <thead>
                <tr>
                  <th>
                          ID
                  </th>
                  <th>
                          DATE
                  </th>
                  <th>
                          TOTAL
                  </th>
                  <th>
                          PAYED?
                  </th>
                  <th>
                          DELIVERED?
                  </th>
                  <th>
                          ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order._id}
                    </td>
                    <td>
                      {order.createdAt}
                    </td>
                    <td>
                      {order.totalPrice}
                    </td>
                    <td>
                      {order.isPayed}
                    </td>
                    <td>
                      {order.isDelivered}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    );
}
export default AdminOrdersScreen;
