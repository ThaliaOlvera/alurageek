import { apiConnection } from "./connectionAPI.js";

const list = document.querySelector("[data-list]");

function createCard(title, price, image, id) {
  const product = document.createElement("article");
  product.className = "card";
  product.innerHTML = `
   
            <img class="productImg" src=${image}/>
            <h3>${title}</h3>
            <div class="card--title">
              <p>$${price}</p>
              <img src="src/img/trash_white.png" alt="trash icon" data-remove="true" data-id="${id}" />
      
            </div>
        
          `;
  return product;
}

async function productsList() {
  const listAPI = await apiConnection.productsList();
  listAPI.forEach((product) =>
    list.appendChild(
      createCard(product.title, product.price, product.image, product.id)
    )
  );
}

productsList();
