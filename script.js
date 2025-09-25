//pego a api interna - arquivo pizzas.js
pizzaJson.map((i, index) => {
  //clona o modelo do html - multiplicando pela quantidade de itens no loop
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", i.id);
  pizzaItem.querySelector(".pizza-item--name").innerHTML = i.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = i.description;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${i.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--img img").setAttribute("src", i.img);
  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.closest(".pizza-item").getAttribute("data-key");

    document.querySelector(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    document.querySelector(".pizzaInfo--desc").innerHTML =
      pizzaJson[key].description;
    document
      .querySelector(".pizzaBig img")
      .setAttribute("src", pizzaJson[key].img);
    document.querySelector(
      ".pizzaInfo--actualPrice"
    ).innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

    document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    document.querySelector(".pizzaWindowArea").style.display = "flex";
    document.querySelector(".pizzaWindowArea").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".pizzaWindowArea").style.opacity = "1";
    }, 200);
  });

  //coloca na tela
  document.querySelector(".pizza-area").append(pizzaItem);
});
