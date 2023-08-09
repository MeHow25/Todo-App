import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import tasksReducer from "./reducer";

export const store = configureStore({
    reducer: {
        global: tasksReducer
    },
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