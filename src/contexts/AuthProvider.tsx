import { UserProfile } from "firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { _auth } from "../utils/_firebase";

const AuthContext = createContext<{ user: UserProfile | null }>({ user: null });

export const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    return _auth.onAuthStateChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, "token", "", { path: "/" });
        router.push("/login");
        return setUser(null);
      }

      const token = await user.getIdToken();
      nookies.set(undefined, "token", token, { path: "/" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
