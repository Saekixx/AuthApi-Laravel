import { postConfig, getConfig } from "./fetchConfig.js";

export const login = async (email, password) => {
  return await postConfig("login", { email, password });
};

export const register = async (name, email, password, confirmed_password) => {
  return await postConfig("register", {
    name,
    email,
    password,
    confirmed_password,
  });
};

export const logout = async () => {
  return await postConfig("logout");
};

export const loginWithGoogle = () => {
  window.location.href = "http://localhost:8000/api/google-auth/redirect";
};

export const verifyToken = async (token) => {
  return await getConfig("verify-token", { token });
};

export const resetPasswordEmail = async (email) => {
  return await postConfig("reset-password-link", { email: email });
};

export const resetPassword = async (
  token,
  email,
  password,
  confirmed_password,
) => {
  return await postConfig("reset-password", {
    token,
    email,
    password,
    confirmed_password,
  });
};
