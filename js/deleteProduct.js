import { apiConnection } from "./connectionAPI.js";

const listOfItems = document.querySelector("[data-list]");

listOfItems.addEventListener("click", async (e) => {
  e.preventDefault();

  const itemId = e.target.dataset.id;
  console.log("ID del producto a eliminar:", itemId);

  if (e.target.nodeName === "IMG" && e.target.dataset.remove) {
    await apiConnection.deleteProduct(itemId);
    producstList();
  }
});
