import { Middleware, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import {
  setConnected,
  setConnectionError,
  incrementReconnectAttempts,
  resetSocket,
} from "../slices/socketSlice";

export const SOCKET_CONNECT = "socket/connect";
export const SOCKET_DISCONNECT = "socket/disconnect";

interface SocketConnectAction extends AnyAction {
  type: typeof SOCKET_CONNECT;
  payload: {
    apiUrl: string;
    accessToken: string;
  };
}

interface SocketDisconnectAction extends AnyAction {
  type: typeof SOCKET_DISCONNECT;
}

type SocketActions = SocketConnectAction | SocketDisconnectAction;

export const connectSocket = (
  apiUrl: string,
  accessToken: string
): SocketConnectAction => ({
  type: SOCKET_CONNECT,
  payload: { apiUrl, accessToken },
});

export const disconnectSocket = (): SocketDisconnectAction => ({
  type: SOCKET_DISCONNECT,
});

let socketInstance: Socket | null = null;

export const socketMiddleware: Middleware<{ dispatch: Dispatch<AnyAction> }> =
  (store) => (next) => (action: unknown) => {
    const result = next(action);

    switch ((action as SocketActions).type) {
      case SOCKET_CONNECT: {
        const { apiUrl, accessToken } = (action as SocketConnectAction).payload;

        if (socketInstance?.connected) return result;

        if (socketInstance) {
          socketInstance.disconnect();
          socketInstance = null;
        }

        socketInstance = io(apiUrl, {
          auth: { token: accessToken },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
          transports: ["websocket"],
        });

        socketInstance.on("connect", () => {
          store.dispatch(setConnected(true));
        });

        socketInstance.on("disconnect", () => {
          store.dispatch(setConnected(false));
        });

        socketInstance.on("connect_error", (error: Error) => {
          store.dispatch(setConnectionError(error.message));
          store.dispatch(incrementReconnectAttempts());
        });

        socketInstance.on("error", (error: Error) => {
          store.dispatch(
            setConnectionError(error.message || "Socket error occurred")
          );
        });

        break;
      }

      case SOCKET_DISCONNECT: {
        if (socketInstance) {
          socketInstance.disconnect();
          socketInstance = null;
        }
        store.dispatch(resetSocket());
        break;
      }
    }

    return result;
  };
