import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import socketReducer from "./slices/socketSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore socket instance in serialization checks
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: ["socket.socket"],
      },
    }).concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
