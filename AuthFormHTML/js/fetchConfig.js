const BASE_URL = "http://localhost:8000/api/";

export const postConfig = async (endpoint, postData) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Si el token existe, agregarlo al encabezado de autorización
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error("No se pudo enviar la información");

  return data;
};

export const getConfig = async (endpoint) => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Si el token existe, agregarlo al encabezado de autorización
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al obtener la información");
  }

  return await response.json();
};
