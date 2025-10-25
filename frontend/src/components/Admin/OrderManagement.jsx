import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {orders , loading , error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.auth);

  useEffect(()=>{
    if(!user || user.role !== "admin"){
      navigate("/");
    }else{
      dispatch(fetchAllOrders());
    }
  },[dispatch, navigate , user])

  const handleStatusChange = (orderId, status) => {
   dispatch(updateOrderStatus({id:orderId , status}));
  };

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: {error}</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm: rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase ☐ text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <tr key={order._id} className=" hover:bg-gray-50 cursor-pointer">
                        <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                            #{order._id}
                        </td>
                        <td className="p-4">{order.user.name}</td>
                        <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                        <td className="p-4">
                            <select value={order.status} onChange={(e)=>handleStatusChange(order._id, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="Processing">Processing</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Shipped">Shipped</option>
                            </select>
                        </td>
                        <td className="p-4">
                          <button onClick={()=>handleStatusChange(order._id, "Delivered")} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Mark as Delivered</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr colSpan={5} className="p-4 text-center text-gray-500">
                  No orders found
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
