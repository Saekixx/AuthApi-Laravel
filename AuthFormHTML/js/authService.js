import { postConfig, getConfig } from "./fetchConfig.js";

export const login = async (email, password) => {
  return await postConfig("login", { email, password });
};

export const register = async (name, email, password, confirmed_password) => {
  const data = await postConfig("register", {
    name,
    email,
    password,
    confirmed_password,
  });
};

export const logout = async () => {
  return await postConfig("logout");
};

export const loginWithGoogle = async () => {
  const data = await getConfig("google-auth/redirect");
};

export const verifyToken = async (token) => {
  return await getConfig("verify-token", { token });
};
