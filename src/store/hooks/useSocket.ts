import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store";
import {
  connectSocket,
  disconnectSocket,
} from "../middleware/socketMiddleware";

interface UseSocketReturn {
  isConnected: boolean;
  connectionError: string | null;
  reconnectAttempts: number;
}

export const useSocket = (
  apiUrl?: string,
  accessToken?: string
): UseSocketReturn => {
  const dispatch = useDispatch();
  const { isConnected, connectionError, reconnectAttempts } = useSelector(
    (state: RootState) => state.socket
  );

  useEffect(() => {
    if (apiUrl && accessToken) {
      dispatch(connectSocket(apiUrl, accessToken));
    } else {
      dispatch(disconnectSocket());
    }
  }, [apiUrl, accessToken, dispatch]);

  return {
    isConnected,
    connectionError,
    reconnectAttempts,
  };
};
