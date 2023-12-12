import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Users/reducer";

const store = configureStore({
    reducer: {
        userReducer,
    },
});

export default store;