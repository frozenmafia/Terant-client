import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from "./feature/devices/devicesSlice";
const placeholderReducer = (state = {}, action: { type: any; }) => {
  switch (action.type) {
    // You can handle specific actions here if needed
    default:
      return state;
  }
};
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Use the placeholder reducer here
      devices: devicesReducer,
    },
  });
};


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']