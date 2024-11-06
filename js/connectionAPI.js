async function productsList() {
  const connection = await fetch("http://localhost:3000/products");
  const parseConnection = await connection.json();

  return parseConnection;
}

async function sendProduct(title, price, image) {
  const connection = await fetch("http://localhost:3000/products", {
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

export const apiConnection = {
  productsList,
  sendProduct,
};
