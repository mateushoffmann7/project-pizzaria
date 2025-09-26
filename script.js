//função para seletorde query
const selector = (e) => {
  return document.querySelector(e);
};

const selectorAll = (e) => {
  return document.querySelectorAll(e);
};

//pego a api interna - arquivo pizzas.js
let cart = [];
let modalQt = 1;
let modalKey = 0;

//lista de pizzas
pizzaJson.map((i, index) => {
  //clona o modelo do html - multiplicando pela quantidade de itens no loop
  let pizzaItem = selector(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", i.id);
  pizzaItem.querySelector(".pizza-item--name").innerHTML = i.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = i.description;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${i.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--img img").setAttribute("src", i.img);

  //abrir modal
  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    //reseta quantidade
    modalQt = 1;
    //qual é a pizza - array
    modalKey = key;

    selector(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    selector(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    selector(".pizzaBig img").setAttribute("src", pizzaJson[key].img);
    selector(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    selector(".selected").classList.remove("selected");
    selectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    //modal sempre abre com quantidade resetada "1"
    selector(".pizzaInfo--qt").innerHTML = modalQt;

    selector(".pizzaWindowArea").style.display = "flex";
    selector(".pizzaWindowArea").style.opacity = "0";
    setTimeout(() => {
      selector(".pizzaWindowArea").style.opacity = "1";
    }, 200);
  });

  //coloca na tela cada pizza
  selector(".pizza-area").append(pizzaItem);
});

//modal events
const closeModal = () => {
  selector(".pizzaWindowArea").style.opacity = "0";
  setTimeout(() => {
    selector(".pizzaWindowArea").style.display = "none";
  }, 500);
};

//botões para fechar modal
selectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
  item.addEventListener("click", closeModal);
});

selector(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    selector(".pizzaInfo--qt").innerHTML = modalQt;
  } else {
    modalQt == 1;
  }
});

selector(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  selector(".pizzaInfo--qt").innerHTML = modalQt;
});

selectorAll(".pizzaInfo--size").forEach((size) => {
  size.addEventListener("click", (e) => {
    selector(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

selector(".pizzaInfo--addButton").addEventListener("click", () => {
  //tranformando em number - parseInt() === "+"
  let size = +selector(".pizzaInfo--size.selected").getAttribute("data-key");
  let identifier = `${pizzaJson[modalKey].id}@${size}`;
  //cada item do carrinho vai procurar o identifier anterior
  let key = cart.findIndex((item) => {
    return item.identifier == identifier;
  });

  //se o key nao encontrar o mesmo identifier ele adiciona item novo
  if (key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt,
    });
  }

  updateCart();
  closeModal();
});

selector(".menu-openner").addEventListener("click", () => {
  if (cart.length > 0) {
    selector("aside").style.left = "0";
  }
});
selector(".menu-closer").addEventListener("click", () => {
  selector("aside").style.left = "100dvh";
});

const updateCart = () => {
  selector(".menu-openner span").innerHTML = cart.length;

  if (cart.length > 0) {
    selector("aside").classList.add("show");
    selector(".cart").innerHTML = "";

    let subtotal = 0;
    let disccount = 0;
    let total = 0;

    cart.forEach((i) => {
      let pizzaItem = pizzaJson.find((item) => {
        return item.id == i.id;
      });

      subtotal += pizzaItem.price * i.qt;

      let pizzaSize;
      switch (i.size) {
        case 0:
          pizzaSize = "P";
          break;
        case 1:
          pizzaSize = "M";
          break;
        case 2:
          pizzaSize = "G";
          break;
      }

      let cartItem = selector(".models .cart--item").cloneNode(true);
      cartItem.querySelector("img").src = pizzaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = `${pizzaItem.name} (${pizzaSize})`;
      cartItem.querySelector(".cart--item--qt").innerHTML = `${i.qt}`;

      cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
        if (i.qt > 1) {
          i.qt--;
        } else {
          cart.splice(i, 1);
        }
        updateCart();
      });
      cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
        i.qt++;
        updateCart();
      });

      selector(".cart").append(cartItem);
    });

    disccount = subtotal * 0.1;
    total = subtotal - disccount;

    selector(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
    selector(".desconto span:last-child").innerHTML = `R$ ${disccount.toFixed(2)}`;
    selector(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
  } else {
    selector("aside").classList.remove("show");
    selector("aside").style.left = "100dvh";
  }
};
