"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeAuth } from "@/store/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(initializeAuth());
      initialized.current = true;
    }
  }, [dispatch]);

  return <>{children}</>;
}
