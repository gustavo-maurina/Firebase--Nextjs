import { PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthProvider";

export const Layout = ({ children }: PropsWithChildren<any>) => {
  const { user } = useAuth();

  return <>{children}</>;
};
