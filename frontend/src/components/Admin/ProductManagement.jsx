import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const { products , loading , error } = useSelector((state) => state.adminProducts);
  const {user} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(!user || user.role !== "admin"){
      navigate("/")
    }else{
      dispatch(fetchAdminProducts())
    }
  },[dispatch , navigate , user])

  const handleDelete = (id)=>{
    if(window.confirm("Are you sure you want to delete this product?")){
       dispatch(deleteProduct(id));
    }
  }

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: {error}</div>
  }

  return (
    <div className="max-w-7x1 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm: rounded-lg">
        <table className="min-w-full text-left □text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase ◎text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
                products.map((product)=>(
                    <tr key={product._id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                            {product.name}
                        </td>
                        <td className="p-4">${product.price.toFixed(2)}</td>
                        <td className="p-4">{product.sku}</td>
                        <td className="p-4">
                            <Link to={`/admin/products/${product._id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                                Edit
                            </Link>
                            <button onClick={()=>handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                ))
            ):(
                <tr>
                    <td colSpan={4} className="p-4 text-center">No products found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
