import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchOrders" , async(__DO_NOT_USE_ActionTypes,{rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/getAllOrders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

// update order status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus" , async({id , status }, {rejectWithValue}) => {
        try {
            const response = await axios.put(
             `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/updateOrderStatus/${id}`,
                {status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

// delete order
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder" , async(id , {rejectWithValue}) => {
        try {
            await axios.delete(
             `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/deleteOrder/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return id;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
) 

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // Fetch all orders 
        .addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.totalOrders = action.payload.length;

            // Calculate total sales
            const totalSales = action.payload.reduce((acc,order)=>{
                return acc + order.totalPrice;
            },0);
            state.totalSales = totalSales;

        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.message;
        })

        // Update order status
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            const updatedOrder = action.payload;
            const orderIndex = state.orders.findIndex(
                (order) => order._id === updatedOrder._id
            );
            if (orderIndex !== -1) {
                state.orders[orderIndex] = updatedOrder;
            }
        })

        // Delete order
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter((order) => order._id !== action.payload);
        })
    }
});

export default adminOrderSlice.reducer;