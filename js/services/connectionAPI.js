const ApiURL = "https://673644d1aafa2ef222300a9c.mockapi.io/products";

async function listedProducts() {
  const connection = await fetch(ApiURL);
  console.log(connection);
  const parseConnection = await connection.json();
  console.log(parseConnection);
  return parseConnection;
}

async function sendProduct(title, price, image) {
  const connection = await fetch(ApiURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
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
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!connection.ok) {
    const errorMessage = await connection.text();
    console.error("Error:", errorMessage);
    throw new Error("No se ha podido eliminar el producto");
  }

  return connection.json();
}

export const apiConnection = {
  listedProducts,
  sendProduct,
  deleteProduct,
};
