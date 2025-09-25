//pego a api interna - arquivo pizzas.js
let cart = [];
let modalQt = 1;

//lista de pizzas
pizzaJson.map((i, index) => {
  //clona o modelo do html - multiplicando pela quantidade de itens no loop
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", i.id);
  pizzaItem.querySelector(".pizza-item--name").innerHTML = i.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = i.description;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${i.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--img img").setAttribute("src", i.img);

  //abrir modal
  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    modalQt = 1;

    document.querySelector(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    document.querySelector(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    document.querySelector(".pizzaBig img").setAttribute("src", pizzaJson[key].img);
    document.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toFixed(2)}`;
    document.querySelector(".selected").classList.remove("selected");
    document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    //modal sempre abre com quantidade resetada "1"
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;

    document.querySelector(".pizzaWindowArea").style.display = "flex";
    document.querySelector(".pizzaWindowArea").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".pizzaWindowArea").style.opacity = "1";
    }, 200);
  });

  //coloca na tela cada pizza
  document.querySelector(".pizza-area").append(pizzaItem);
});

//modal events
const closeModal = () => {
  document.querySelector(".pizzaWindowArea").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".pizzaWindowArea").style.display = "none";
  }, 500);
};

//botões para fechar modal

document
  .querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton")
  .forEach((e) => {
    e.addEventListener("click", closeModal);
  });

document.querySelector(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
  } else {
    modalQt == 1;
  }
});

document.querySelector(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
});

document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

document.querySelector(".pizzaInfo--addButton").addEventListener("click", () => {});
