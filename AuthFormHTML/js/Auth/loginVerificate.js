// js/login-guard.js
import { verifyToken } from "../authService.js";

const loginVerificate = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await verifyToken(token);

      window.location.href = "dashboard.html";
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

loginVerificate();
