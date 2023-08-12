import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import tasksReducer from "./reducer";
import {apiSlice} from './api-slice'

export const store = configureStore({
    reducer: {
        global: tasksReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
// Action<string>
// >;