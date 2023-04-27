import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterreducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
