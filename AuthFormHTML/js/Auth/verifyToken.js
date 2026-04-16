import { verifyToken } from "../authService.js";

const verifyUserToken = async () => {
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");

  if (!token || !userJson) {
    window.location.href = "login.html";
    return;
  }

  try {
    const user = JSON.parse(userJson);
    const data = await verifyToken(token);

    const nameElement = document.getElementById("user-name");
    if (nameElement) {
      nameElement.innerText = data.user?.name || user.name || "Usuario";
    }
  } catch (error) {
    console.error("EL ERROR REAL ES:", error);
    localStorage.clear();
    window.location.href = "login.html";

    document.getElementById("user-name").innerText = "Error: " + error.message;
  }
};

window.addEventListener("load", verifyUserToken);
