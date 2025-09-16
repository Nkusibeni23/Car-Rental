"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeAuth } from "@/store/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
}
