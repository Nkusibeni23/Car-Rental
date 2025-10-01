import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  isConnected: boolean;
  connectionError: string | null;
  reconnectAttempts: number;
}

const initialState: SocketState = {
  isConnected: false,
  connectionError: null,
  reconnectAttempts: 0,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      if (action.payload) {
        state.connectionError = null;
        state.reconnectAttempts = 0;
      }
    },
    setConnectionError: (state, action: PayloadAction<string | null>) => {
      state.connectionError = action.payload;
    },
    incrementReconnectAttempts: (state) => {
      state.reconnectAttempts += 1;
    },
    resetSocket: (state) => {
      state.isConnected = false;
      state.connectionError = null;
      state.reconnectAttempts = 0;
    },
  },
});

export const {
  setConnected,
  setConnectionError,
  incrementReconnectAttempts,
  resetSocket,
} = socketSlice.actions;

export default socketSlice.reducer;
