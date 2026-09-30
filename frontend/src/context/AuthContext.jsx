
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../utils/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const loadUser = async () => {
    const token =
      localStorage.getItem("token");

    // No token = user is logged out
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } =
        await api.get("/auth/me");

      setUser(data.user);
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );

      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (
    email,
    password
  ) => {
    const { data } =
      await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

    return data;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    const { data } =
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

