import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../api/api';
import ApiEndPoint from '../../api/apiEndPoint';

export const getVehicleDetails = createAsyncThunk(
  'vehicle/getDetails',
  async (vehicleData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ApiEndPoint.GETVEHICLEDETAILS, {
        veh_num: vehicleData.veh_num
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch vehicle details' });
    }
  }
);

const initialState = {
  vehicleData: null,
  isLoading: false,
  error: null
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    clearVehicleData: (state) => {
      state.vehicleData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVehicleDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicleData = action.payload;
      })
      .addCase(getVehicleDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearVehicleData } = vehicleSlice.actions;
export default vehicleSlice.reducer;