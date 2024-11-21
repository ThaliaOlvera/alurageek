import { apiConnection } from "../services/connectionAPI.js";

const list = document.querySelector("[data-list]");

// Crear tarjeta de producto
function createCard(title, price, image, id) {
  const product = document.createElement("article");
  product.className = "card";
  product.innerHTML = `
    <img class="productImg" src="${image}" alt="Product Image" />
    <h3>${title}</h3>
    <div class="card--title">
      <p>$${price}</p>
      <img src="src/img/trash_white.png" alt="trash icon" data-remove="true" data-id="${id}" />
    </div>
  `;
  return product;
}

// Listar productos desde la API
async function productsList() {
  try {
    list.innerHTML = ""; // Limpia la lista antes de renderizar
    const listAPI = await apiConnection.listedProducts();
    listAPI.forEach((product) =>
      list.appendChild(
        createCard(product.title, product.price, product.image, product.id)
      )
    );
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
  }
}

// Eliminar producto y actualizar el DOM
list.addEventListener("click", async (e) => {
  e.preventDefault();

  const target = e.target;
  const itemId = target.dataset.id;

  if (target.nodeName === "IMG" && target.dataset.remove && itemId) {
    try {
      await apiConnection.deleteProduct(itemId);
      // Elimina el elemento del DOM
      const productCard = target.closest(".card");
      if (productCard) productCard.remove();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
});

// Crear nuevo producto
const form = document.querySelector("[data-form]");
async function createProduct(evento) {
  evento.preventDefault();

  const title = document.querySelector("[data-title]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  try {
    await apiConnection.sendProduct(title, price, image);

    // Limpia los campos del formulario
    document.querySelector("[data-title]").value = "";
    document.querySelector("[data-price]").value = "";
    document.querySelector("[data-image]").value = "";

    // Agrega el producto recién creado al DOM
    productsList();
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
}

// Escuchar el evento 'submit' del formulario
form.addEventListener("submit", createProduct);

// Inicializar la lista de productos al cargar la página
productsList();
