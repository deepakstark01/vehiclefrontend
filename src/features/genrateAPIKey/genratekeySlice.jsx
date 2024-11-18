import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../api/api';
import ApiEndPoint from '../../api/apiEndPoint';

export const generateApiKey = createAsyncThunk(
  'genratekey/generate',
  async (keyData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ApiEndPoint.GENERATE_KEY, {
        name: keyData.name,
        description: keyData.description
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to generate key' });
    }
  }
);

const initialState = {
  apiKey: null,
  isLoading: false,
  error: null,
  keyDetails: null
};

const genratekeyslice = createSlice({
  name: 'genratekey',
  initialState,
  reducers: {
    clearApiKey: (state) => {
      state.apiKey = null;
      state.keyDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateApiKey.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateApiKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiKey = action.payload.data.api_key;
        state.keyDetails = action.payload.data;
      })
      .addCase(generateApiKey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearApiKey } = genratekeyslice.actions;
export default genratekeyslice.reducer;
