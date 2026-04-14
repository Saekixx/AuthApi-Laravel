const BASE_URL = "http://127.0.0.1:8000/api/";

export const postConfig = async (endpoint, postData) => {
  const response = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error("No se pudo enviar la información");
  }

  return data;
};
