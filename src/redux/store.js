import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import { thank } from "redux-thunk";

export const store = configureStore({

    reducer:{
        user:userReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})