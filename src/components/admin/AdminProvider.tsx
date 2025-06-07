
import { AdminProvider } from "@/contexts/AdminContext";
import { ReactNode } from "react";

interface AdminProviderWrapperProps {
  children: ReactNode;
}

export default function AdminProviderWrapper({ children }: AdminProviderWrapperProps) {
  return <AdminProvider>{children}</AdminProvider>;
}
