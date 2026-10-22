import { createContext, useContext, useEffect, useState } from "react";

export type User = { name?: string; email?: string; id?: string };

type AuthProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

type AuthProviderState = {
  user: User;
  setUser: (value: User) => void;
};

const AuthProviderContext = createContext<AuthProviderState>({
  user: {},
  setUser: () => {},
});

const defaultUser = {
  name: "User Name",
  email: "user.name@henkel.com",
  id: "123123",
};
export function AuthProvider({
  children,
  storageKey = "sso_user",
}: AuthProviderProps) {
  const [user, setUserState] = useState<User>(defaultUser);

  useEffect(() => {
    if (user === defaultUser) return;
    const stored = localStorage.getItem(storageKey);
    setUserState(stored ? JSON.parse(stored) : {});
  }, [storageKey]);

  const setUser = (next: User) => {
    localStorage.setItem(storageKey, JSON.stringify(next));
    setUserState(next);
  };

  return (
    <AuthProviderContext value={{ user, setUser }}>
      {children}
    </AuthProviderContext>
  );
}

export function useAuth() {
  const context = useContext(AuthProviderContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");
  return context;
}
