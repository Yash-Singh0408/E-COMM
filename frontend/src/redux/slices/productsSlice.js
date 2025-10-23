import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/products/getProducts?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/getProduct/${id}`
    );
    return response.data;
  }
);

// Async thunk to updateProduct products
export const updatedProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id , productData}) =>{
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/updateProduct/${id}`,
             productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }  
        );
        return response.data;
    }
) 

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts", 
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/getSimilarProducts/${id}`
        );
        return response.data;
    }
)

 const  productsSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null, // store details of a single product
        similarProducts:[],
        loading:false,
        error:null,
        filter:{
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:"",
        }
    },
    reducers:{
        setFilters:(state,action)=>{
            state.filter={...state.filter,...action.payload}
        },
        clearFilters:(state)=>{
            state.filter={
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:"",
        }
    }
},
extraReducers:(builder)=>{
    builder
    // Handle fetchProductsByFilters
    .addCase(fetchProductsByFilters.pending, (state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(fetchProductsByFilters.fulfilled, (state,action)=>{
        state.loading=false;
        state.products=Array.isArray(action.payload)? action.payload : [];
    })
    .addCase(fetchProductsByFilters.rejected, (state,action)=>{
        state.loading=false;
        state.error=action.error.message;
    })

    // Handle fetchProductDetails
    .addCase(fetchProductDetails.pending, (state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(fetchProductDetails.fulfilled, (state,action)=>{
        state.loading=false;
        state.selectedProduct=action.payload;
    })
    .addCase(fetchProductDetails.rejected, (state,action)=>{
        state.loading=false;
        state.error=action.error.message;
    })

    // Handle updateProduct
    .addCase(updatedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updatedProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex((product)=>
            product._id === updatedProduct._id
    );
    if(index !== -1){
        state.products[index] = updatedProduct;
    }
    })
    .addCase(updatedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })

    // Handle fetchSimilarProducts
    .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
    })
    .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
}
})

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
