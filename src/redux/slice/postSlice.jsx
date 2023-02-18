import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiUrl from "../utils/apiUrl";
import axios from "axios";


const initialState = {
    posts: [],
    loading: false,
    error: ''
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (payload, { rejectWithValue, getState, dispatch }) => {
    try
    {
        const res = await axios.get(apiUrl);
         return res.data
    } catch (error)
    {
        return rejectWithValue(error.response.status)
    }
    
})

//search post
export const searchPosts = createAsyncThunk("posts/searchPosts", async (id, { rejectWithValue, getState, dispatch }) => {
    try
    {
        const res = await axios.get(`${apiUrl}/${id}`);
         return res.data
    } catch (error)
    {
        return rejectWithValue(error.response.status)
    }
    
})



const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
            state.posts = []
        })
        builder.addCase(searchPosts.pending, (state) => {
            state.loading =true
        })
        builder.addCase(searchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = [action.payload]
        })
        builder.addCase(searchPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.posts = []
        })
       
    }
});

export const postReducer = postSlice.reducer;

