import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers as getUsersApi } from '../services/ApiJSON';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (filters, thunkAPI) => {
    try {
      const data = await getUsersApi(filters);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
