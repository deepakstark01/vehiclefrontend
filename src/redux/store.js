import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import genratekeyReducer from '../features/genrateAPIKey/genratekeySlice'
import vehicleReducer from '../features/vehicles/vehicleSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    genratekey: genratekeyReducer,
    vehicle: vehicleReducer
  }
})