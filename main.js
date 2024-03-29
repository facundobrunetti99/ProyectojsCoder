//EXTRAER PRODUCTOS JSON
const extraerProductos = async () => {
  const resp = await fetch("./data.json");
  const data = await resp.json();
  cargarProductos(data);
};

//TOTAL DEL PRECIO HTML
const TotalHTML = document.querySelector(".texto__precio");
let carrito = [];

//STORAGE
if (carrito === null || localStorage.length != 0) {
  localStorageItem();
}
extraerProductos();

let productos = [];
const cargarProductos = (data) => {
  productos = data;
  productos.forEach((product, i) => {
    const seleccionCarrito = document.querySelector(".contenedor-article");
    const divDelProducto = document.createElement("div");
    divDelProducto.classList.add(
      "conteiner",
      "col-sm-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-3",
      "contendor--card"
    );

    divDelProducto.innerHTML = `
  <div class="card" style="width: 100%;">
  <img src="${product.img}" class="img-tamaño" alt="...">
  <div class="card-body">
    <h5 class="card--title">${product.name}</h5>
    <p class="card--text">$ ${product.price}</p>
    <button class="button--card" onClick="addTocart(${i})">Comprar</button>
  </div>
</div>`;
    seleccionCarrito.appendChild(divDelProducto);
  });
};

//PUSH CARRITO
const carritoAgregar = document.querySelector(".conteiner conteiner__cart");
function addTocart(i) {
  Toastify({
    text: "Producto agregado!",
    duration: 1000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(90deg, rgba(185,224,138,1) 0%, rgba(116,200,48,0.9962359943977591) 35%, rgba(107,215,137,0.8925945378151261) 100%)",
    },
    onClick: function () {},
  }).showToast();

  let posicion = i;
  index = carrito.findIndex((element) => {
    return element.id === productos[i].id;
  });

  if (index === -1) {
    const productoAgregar = productos[posicion];
    productoAgregar.cant = 1;
    carrito.push(productoAgregar);
    carritoDibujar(productoAgregar);
    sumaCarrito();
    const cart = JSON.stringify(carrito);
    localStorage.setItem("carrito", cart);
  } else {
    let cantI = (carrito[index].cant += 1);
    carritoDibujar(carrito[index]);
    sumaCarrito();
    cambiarValue();
    const actualizarCart = JSON.parse(localStorage.getItem("carrito"));
    actualizarCart[index].cant = cantI;
    const item = JSON.stringify(actualizarCart);
    localStorage.setItem("carrito", item);
   
  }

  cambiarNum();
}
//AGREGAR AL LOCALSTORAGE
function localStorageItem() {
  const selecionCart = document.querySelector(".conteiner__cart");
  let produtLS;
  produtLS = localStorage.getItem("carrito");
  let CartLS = JSON.parse(produtLS);
  carrito = CartLS;
  carrito.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("conteiner__cart--item");
    div.innerHTML = `
    <div class="conteiner--title--img">
    <img src="${element.img}" alt="" class="img__cart--item">
        <p class="title__cart--item"><b>${element.name}</b></p>
    </div>
    <p class="precio__cart--item"><b>$${element.price}</b></p>
  
    <input type="number" class="cantidad__cart--item" value="${element.cant}">
    <button class="eliminar__cart--item" onClick="eliminarItemCart(${element.id},${element.cant})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(247, 4, 4, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></button>
    `;
    selecionCart.appendChild(div);
  });
  cambiarValue();
  cambiarNum();
  sumaCarrito();
}
//CAMBIAR NUMERO DE ITEMS DEL CARRITO
function cambiarNum() {
  const addtocartNumber = document.querySelector(".numCart_cant");
  const tItem = carrito.length;
  addtocartNumber.innerHTML = `<p>${tItem}</p> `;
}

//AGREGAR CARRITO AL HTML
const selecionCart = document.querySelector(".conteiner__cart");
function carritoDibujar(data) {
  const div = document.createElement("div");
  div.classList.add("conteiner__cart--item");
  const title = selecionCart.querySelectorAll(".title__cart--item");
  carrito.forEach((element, i) => {
    if (data.cant > 1) {
      title.forEach((titles) => {
        if (titles.textContent === data.name) {
          const divT = titles.closest(".conteiner__cart--item");
          const valueT = divT.querySelector(".cantidad__cart--item");
          valueT.value = data.cant;
        }
      });
    } else if (data.cant != 0 && data.cant === 1) {
      div.innerHTML = `
    <div class="conteiner--title--img">
    <img src="${element.img}" alt="" class="img__cart--item">
        <p class="title__cart--item"><b>${element.name}</b></p>
    </div>
    <p class="precio__cart--item"><b>$${element.price}</b></p>
  
    <input type="number" class="cantidad__cart--item" value="${element.cant}">
    <button class="eliminar__cart--item" onClick="eliminarItemCart(${element.id},${i},${element.cant})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(247, 4, 4, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></button>

    `;
      selecionCart.appendChild(div);
      cambiarValue();
    }
  });
}

//SUMA TOTAL DEL CARRITO

function sumaCarrito() {
  let total = 0;
  carrito.forEach((element) => {
    total = element.price * element.cant + total;
  });
  TotalHTML.innerHTML = `<b class="precioHTML">TOTAL $${total}</b>
                          <button class="button__comprarAddCart">Comprar</button>`;

  const button1 = document.querySelector(".button__comprarAddCart");

  button1.addEventListener("click", () => {
    limpiarCarrito();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Muchas gracias por su compra!`,
      showConfirmButton: false,
      timer: 2000,
    });
  });
}

//FUNCION ELIMINAR ITEMS DE UN CARRITO
function eliminarItemCart(idItem) {
  const title = selecionCart.querySelectorAll(".title__cart--item");

  carrito.forEach((element, i) => {
    if (element.id === idItem) {
      if (element.cant === 1) {
        title.forEach((titulo) => {
          if (titulo.textContent === element.name) {
            const divElminar = titulo.closest(".conteiner__cart--item");
            divElminar.remove();
            carrito.splice(i, 1);
            cambiarNum();
            sumaCarrito();
            eliminarItemLS();
          }
        });
      } else if (element.cant != 0) {
        title.forEach((titulo) => {
          if (titulo.textContent === element.name) {
            const divCambiarCant = titulo.closest(".conteiner__cart--item");
            const valueCant = divCambiarCant.querySelector(
              ".cantidad__cart--item"
            );

            element.cant--;
            valueCant.value = element.cant;
            sumaCarrito();
          }
        });
        eliminarItemLS();
      }
    }
  });
}

//CAMBIAR LA CANTIDAD DEL VALUE

function cambiarValue() {
  const valueALL = document.querySelectorAll(".cantidad__cart--item");
  valueALL.forEach((element) => {
    element.addEventListener("change", modificarCant);
  });
  function modificarCant(event) {
    const item = event.target;
    const titulos = item.closest(".conteiner__cart--item");
    const titulo1 = titulos.querySelector(".title__cart--item");
    if (Number(item.value) < 1) {
      item.value = 1;
    } else {
      carrito.forEach((element,indice) => {
        if (titulo1.textContent === element.name) {
          element.cant = Number(item.value);
          sumaCarrito();
          const index=indice;

          const actualizarCart = JSON.parse(localStorage.getItem("carrito"));
          actualizarCart[index].cant =   element.cant;
          const item1 = JSON.stringify(actualizarCart);
          localStorage.setItem("carrito", item1);


        }
      });
    }
  }
}

//BUSCAR ITEMS DE LOS PRODUCTOS

document.addEventListener("keyup", (e) => {
  let contador = 0;
  if (e.target.matches(".nav__button--input")) {
    const contenido = document.querySelector(".nav__button--input");
    const textoAbuscar = contenido.value.toLocaleLowerCase();
    const titulos = document.querySelectorAll(".card--title");
    titulos.forEach((T) => {
      let tituloArray = T.textContent.toLocaleLowerCase();
      let valor = tituloArray.includes(textoAbuscar);
      if (textoAbuscar.length >=3) {
        if (!valor) {
          const div = T.closest(".contendor--card");
          div.style.display = "none";
          if ((div.style.display = "none")) {
            contador = contador + 1;
          }
        }
      } else {
        const div = T.closest(".contendor--card");
        div.style.display = "";
      }
    });
  }

  if (contador === 20) {
    const div = document.querySelector(".parrafoBuscar");
    div.style.display = "block";
  } else {
    const div = document.querySelector(".parrafoBuscar");
    div.style.display = "none";
  }
});

//FUNCION COMPRAR LIMPIAR CARRO
function limpiarCarrito() {
  const cantidad = carrito.length;
  carrito.splice(0, cantidad);
  sumaCarrito();
  cambiarValue();
  cambiarNum();
  const selecionCart = document.querySelector(".conteiner__cart");
  const seleccionDiv = selecionCart.querySelectorAll(".conteiner__cart--item");

  seleccionDiv.forEach((element) => {
    element.remove();
  });

  localStorage.removeItem("carrito");
}

//FUNCION ELIMINAR ITEM LOCALSTORAGE
function eliminarItemLS() {
  const cartLS = localStorage.getItem("carrito");
  let cartOBJ = JSON.parse(cartLS);
  cartOBJ = carrito;
  const cartLsNew = JSON.stringify(cartOBJ);
  localStorage.setItem("carrito", cartLsNew);
}

//FUNCION PARA OCULTAR Y MOSTRAR MENU MQUERY
const buttonMenu = document.querySelector(".abrirMenu");

buttonMenu.addEventListener("click", FuncioButton);

function FuncioButton() {
  const contenedorNav = document.querySelector(".nav1");
  const iconPC = document.querySelector(".nav__logo");
  iconPC.style.display = "none";
  const seleccionCruz = document.querySelector(".CerrarMenu");
  seleccionCruz.style.display = "block";
  contenedorNav.style.display = "flex";
  buttonMenu.style.display = "none";
  seleccionCruz.addEventListener("click", CerrarMenuAccion);
}

function CerrarMenuAccion() {
  const iconPC = document.querySelector(".nav__logo");
 
  const contenedorNav = document.querySelector(".nav1");
  contenedorNav.style.display = "none";
  buttonMenu.style.display = "block";
  const seleccionCruz = document.querySelector(".CerrarMenu");
  seleccionCruz.style.display = "none";
  iconPC.style.display = "block";
}
