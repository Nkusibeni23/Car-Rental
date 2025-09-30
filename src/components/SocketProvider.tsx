import React from "react";
import { shallowEqual } from "react-redux"; // Add shallowEqual
import { RootState } from "../store/store";
import { useSocket } from "@/store/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";

interface SocketProviderProps {
  children: React.ReactNode;
  apiUrl: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  apiUrl,
}) => {
  const { isAuthenticated, accessToken } = useAppSelector(
    (state: RootState) => ({
      isAuthenticated: state.auth?.isAuthenticated,
      accessToken: state.auth?.accessToken,
    }),
    shallowEqual
  );

  useSocket(
    isAuthenticated && accessToken ? apiUrl : undefined,
    isAuthenticated && accessToken ? accessToken : undefined
  );

  return <>{children}</>;
};
