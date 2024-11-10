const ApiURL = "http://localhost:3000/products";

async function productsList() {
  const connection = await fetch(ApiURL);
  const parseConnection = await connection.json();

  return parseConnection;
}

async function sendProduct(title, price, image) {
  const connection = await fetch(ApiURL, {
    method: "POST",
    headers: { "Conten-type": "application/json" },
    body: JSON.stringify({
      title: title,
      price: price,
      image: image,
    }),
  });
  const parseConnection = connection.json();
  return parseConnection;
}

async function deleteProduct(id) {
  if (!id) {
    throw new Error("El ID proporcionado es inválido o está indefinido.");
  }

  const connection = await fetch(`${ApiURL}/${id}`, {
    method: "DELETE",
  });

  if (!connection.ok) {
    const errorMessage = await connection.text();
    console.error("Error:", errorMessage);
    throw new Error("No se ha podido eliminar el producto");
  }

  return connection.json();
}

export const apiConnection = {
  productsList,
  sendProduct,
  deleteProduct,
};
