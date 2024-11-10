import { apiConnection } from "./connectionAPI.js";
const form = document.querySelector("[data-form]");

async function createProduct(evento) {
  evento.preventDefault();
  const title = document.querySelector("[data-title]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  await apiConnection.sendProduct(title, price, image);
}

form.addEventListener("submit", (evento) => createProduct(evento));
