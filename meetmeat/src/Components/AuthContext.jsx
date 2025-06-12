import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const testUsers = [
  {
    id: "user-1",
    username: "alice.seznam",
    email: "alice@example.com",
    password: "password123",
  },
  {
    id: "user-2",
    username: "bob.cz",
    email: "bob@example.com",
    password: "securepassword",
  },
  {
    id: "user-3",
    username: "karel.email",
    email: "karel@example.com",
    password: "easy",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Nepodařilo se analyzovat uživatele.", error);
      return null;
    }
  });
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch (error) {
      console.error(
        "Nepodařilo se uložit uživatele do lokálního úložiště",
        error
      );
    }
  }, [user]);

  const login = async (username, password) => {
    const foundUser = testUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userToStore = { ...foundUser };
      delete userToStore.password;

      setUser(userToStore);
      return { success: true, user: userToStore };
    } else {
      return {
        success: false,
        message: "Nesprávné uživatelské jméno nebo heslo.",
      };
    }
  };

  const register = async (username, email, password) => {
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
    };
    const userToStore = { ...newUser };
    delete userToStore.password;

    setUser(userToStore);
    console.log("Nový uživatel registrován a přihlášen:", userToStore);
    return { success: true, user: userToStore };
  };

  const logout = () => {
    setUser(null);
  };
  const isAuthenticated = user !== null;

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
