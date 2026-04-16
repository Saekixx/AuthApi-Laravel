const BASE_URL = "http://localhost:8000/api/";

export const postConfig = async (endpoint, postData) => {
  const response = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al obtener la información");
  }

  return await response.json();
};
