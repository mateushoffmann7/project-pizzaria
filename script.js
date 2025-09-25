//pego a api interna - arquivo pizzas.js
pizzaJson.map((i, index) => {
  //clona o modelo do html - multiplicando pela quantidade de itens no loop
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
  pizzaItem.querySelector(".pizza-item--name").innerHTML = i.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = i.description;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${i.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--img img").setAttribute("src", i.img);
  //coloca na tela
  document.querySelector(".pizza-area").append(pizzaItem);
});
