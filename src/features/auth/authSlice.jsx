import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../api/api';
import ApiEndPoint from '../../api/apiEndPoint';
import { setUser } from '../../utils/utils';

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ApiEndPoint.LOGIN, credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ApiEndPoint.SIGNUP, userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  signIn: {
    isLoading: false,
    error: null
  },
  signUp: {
    isLoading: false,
    error: null
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearErrors: (state) => {
      state.signIn.error = null;
      state.signUp.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.signIn.isLoading = true;
        state.signIn.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.signIn.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.signIn.isLoading = false;
        state.signIn.error = action.payload;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.signUp.isLoading = true;
        state.signUp.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.signUp.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.signUp.isLoading = false;
        state.signUp.error = action.payload;
      });
  }
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
