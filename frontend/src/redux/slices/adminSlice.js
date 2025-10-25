import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers" , async(_,{rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/getUsers`,
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

// create a new user (admin only)
export const addUser = createAsyncThunk(
    "admin/addUser" , async(userData , {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/createUser`,
                userData,
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

// update user details (admin only)
export const updateUser = createAsyncThunk(
    "admin/updateUser" , async({id , name , email, role } , {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/updateUser/${id}`,
                { name, email, role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            )
           return response.data.usero;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

// Delete a user (admin only)
export const deleteUser = createAsyncThunk(
    "admin/deleteUser" , async(id , {rejectWithValue}) => {
        try {
             await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteUser/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            )
            return id
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // Fetch users
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch users";
        })

        // update user 
        .addCase(updateUser.fulfilled, (state,action) => {
            const updatedUser = action.payload;

            const userIndex = state.users.findIndex(
                (user)=>user._id === updatedUser._id
            );
            if(userIndex !== -1){
                state.users[userIndex] = updatedUser;
            }
        })

        // delete user
        .addCase(deleteUser.fulfilled, (state,action) => {
            state.users = state.users.filter(
                (user) => user._id !== action.payload
            );
        })

        // add user
        .addCase(addUser.pending ,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled, (state,action) => {
            state.loading = false;
            state.users.push(action.payload.user); //add new user to the state 
        })
        .addCase(addUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message || "Failed to add user";
        })
    }
})

export default adminSlice.reducer