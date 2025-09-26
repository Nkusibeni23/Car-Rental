import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSocket } from "@/store/hooks/useSocket";

interface SocketProviderProps {
  children: React.ReactNode;
  apiUrl: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  apiUrl,
}) => {
  const { isAuthenticated, accessToken } = useSelector((state: RootState) => ({
    isAuthenticated: state.auth?.isAuthenticated,
    accessToken: state.auth?.accessToken,
  }));

  useSocket(
    isAuthenticated && accessToken ? apiUrl : undefined,
    isAuthenticated && accessToken ? accessToken : undefined
  );

  return <>{children}</>;
};
