//INGRESAR ELEMETONS MEDIANTE EL JSON AL HTML
let Productos = [
  { id: 1, name: "RTX 3090", img: "./images/img6.jpg", price: 325000 },
  {
    id: 2,
    name: "GTX 2070",
    img: "./images/img7.jpg",
    price: 223000,
  },

  {
    id: 3,
    name: "GTX 1060",
    img: "./images/img8.jpg",
    price: 65000,
  },

  {
    id: 4,
    name: "GTX 2090",
    img: "./images/img9.jpg",
    price: 128000,
  },

  {
    id: 5,
    name: "RX 750 TI",
    img: "./images/img10.jpg",
    price: 37000,
  },

  {
    id: 6,
    name: "Gabinete Gamer 330i",
    img: "./images/img11.jpg",
    price: 44000,
  },

  {
    id: 7,
    name: "Gabinete gamer 44001",
    img: "./images/img12.jpg",
    price: 16500,
  },

  {
    id: 8,
    name: "Gabinete gamer Iqual",
    img: "./images/img13.jpg",
    price: 18520,
  },

  {
    id: 9,
    name: "Mouse lgt23",
    img: "./images/img14.jpg",
    price: 4300,
  },

  {
    id: 10,
    name: "Mouse Logitech 430",
    img: "./images/img15.jpg",
    price: 11300,
  },

  {
    id: 11,
    name: "Mouse zaino",
    img: "./images/img16.jpg",
    price: 7200,
  },

  {
    id: 12,
    name: "Monitor LCD 32",
    img: "./images/img17.jpg",
    price: 6500,
  },

  {
    id: 13,
    name: "Monitor 144hz",
    img: "./images/img18.jpg",
    price: 23500,
  },

  {
    id: 14,
    name: "Auriculares osirus",
    img: "./images/img26.jpg",
    price: 12500,
  },

  {
    id:15,
    name: "Teclado Mecanico pink",
    img: "./images/img1.jpg",
    price: 21800,
  },

  {
    id: 16,
    name: "Auriculares Redragon",
    img: "./images/img20.jpg",
    price: 7500,
  },

  {
    id: 17,
    name: "Teclado RGB 2230",
    img: "./images/img2.jpg",
    price: 10390,
  },

  {
    id: 18,
    name: "Teclado Retroiluminado",
    img: "./images/img3.jpg",
    price: 12370,
  },

  {
    id: 19,
    name: "Teclado Black RGB",
    img: "./images/img5.jpg",
    price: 18500,
  },

  {
    id: 0,
    name: "Teclado Black/White",
    img: "./images/img4.jpg",
    price: 8300,
  },
];
const TotalHTML = document.querySelector(".texto__precio");
let carrito = [];

if(carrito===null){
  localStorageItem();
}else if(localStorage.length!=0){
  localStorageItem();
}


//INICIO DE INGRESAR TODO A LA PAGINA
const seleccionCarrito = document.querySelector(".contenedor-article");
Productos.forEach((product, i) => {
  const divDelProducto = document.createElement("div");
  divDelProducto.classList.add(
    "conteiner",
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




//INICIO DE AGREGAR AL CARRITO PUSH CARRITO
const carritoAgregar = document.querySelector(".conteiner conteiner__cart");
function addTocart(i) {

  Toastify({
    text: "Producto agregado!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        "linear-gradient(90deg, rgba(101,181,94,1) 0%, rgba(48,200,61,1) 35%, rgba(12,47,8,1) 100%)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

 

  let posicion = i;
  index = carrito.findIndex((element) => {
    return element.id === Productos[i].id;
  });
 
 

  

 
  if (index === -1) {
    const productoAgregar = Productos[posicion];
    productoAgregar.cant = 1;
    carrito.push(productoAgregar);
    carritoDibujar(productoAgregar);
    sumaCarrito();
    const cart=JSON.stringify(carrito);
    localStorage.setItem("carrito",cart)
    
  
  } else {
    let cantI=carrito[index].cant += 1;
    carritoDibujar(carrito[index]);
    sumaCarrito();
    const actualizarCart=JSON.parse(localStorage.getItem("carrito"));
    actualizarCart[index].cant=cantI
    const item=JSON.stringify(actualizarCart)
    localStorage.setItem("carrito", item);

   
  }

  cambiarNum();

}

function localStorageItem(){
  const selecionCart = document.querySelector(".conteiner__cart");
  let produtLS;
  produtLS=localStorage.getItem("carrito");
  let CartLS=JSON.parse(produtLS);
  carrito=CartLS;
  carrito.forEach((element)=>{
    const div = document.createElement("div");
    div.classList.add("conteiner__cart--item");
    div.innerHTML = `
    <div class="conteiner--title--img">
    <img src="${element.img}" alt="" class="img__cart--item">
        <p class="title__cart--item"><b>${element.name}</b></p>
    </div>
    <p class="precio__cart--item"><b>$${element.price}</b></p>
  
    <input type="number" class="cantidad__cart--item" value="${element.cant}">
    <button class="eliminar__cart--item" onClick="eliminarItemCart(${element.id},${element.cant})">X</button>
    `;
      selecionCart.appendChild(div);
      
  })

  cambiarNum();
  sumaCarrito();

}

function localStorageItem(){


 
  const selecionCart = document.querySelector(".conteiner__cart");
  let produtLS;
  produtLS=localStorage.getItem("carrito");
  let CartLS=JSON.parse(produtLS);
  carrito=CartLS;

  carrito.forEach((element)=>{
    const div = document.createElement("div");
    div.classList.add("conteiner__cart--item");
    div.innerHTML = `
    <div class="conteiner--title--img">
    <img src="${element.img}" alt="" class="img__cart--item">
        <p class="title__cart--item"><b>${element.name}</b></p>
    </div>
    <p class="precio__cart--item"><b>$${element.price}</b></p>
  
    <input type="number" class="cantidad__cart--item" value="${element.cant}">
    <button class="eliminar__cart--item" onClick="eliminarItemCart(${element.id},${element.cant})">X</button>
    `;
      selecionCart.appendChild(div);
      
  })

  cambiarNum();
  sumaCarrito();
}
function cambiarNum() {
  const addtocartNumber = document.querySelector(".numCart_cant");
  const tItem = carrito.length;
  addtocartNumber.innerHTML = `<p>${tItem}</p> `;
}



//AGREGAR HTML AL CARRITO
const selecionCart = document.querySelector(".conteiner__cart");

function carritoDibujar(data){

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
    <button class="eliminar__cart--item" onClick="eliminarItemCart(${element.id},${i},${element.cant})">X</button>


    `;
      selecionCart.appendChild(div);
      cambiarValue(element.id, element.cant);
    }
  });
}

//SUMA TOTAL

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
            console.log(valueCant.cant);
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
      carrito.forEach((element) => {
        if (titulo1.textContent === element.name) {
          element.cant = Number(item.value);
          sumaCarrito();
        }
      });
    }
  }
}



function buscarItem() {
  const contenido = document.querySelector(".nav__button--input");
  const textoAbuscar = contenido.value.toLocaleLowerCase();
  const titulos = document.querySelectorAll(".card--title");

  titulos.forEach((T) => {
    let tituloArray = T.textContent.toLocaleLowerCase();
    let valor = tituloArray.includes(textoAbuscar);
    if (textoAbuscar.length >= 3) {
      if (!valor) {
        const div = T.closest(".contendor--card");
        div.style.display = "none";
      }
    } else {
      const div = T.closest(".contendor--card");
      div.style.display = "";
    }
  });
}


function limpiarCarrito(){
  const cantidad=carrito.length;

    carrito.splice(0,cantidad)
    sumaCarrito() 
    cambiarValue() 
    cambiarNum()
    const selecionCart = document.querySelector(".conteiner__cart");
    const seleccionDiv=selecionCart.querySelectorAll('.conteiner__cart--item');

    seleccionDiv.forEach((element)=>{
      element.remove();
    })

    localStorage.removeItem("carrito")
  }

  function  eliminarItemLS(){
   
      const cartLS=localStorage.getItem("carrito")
      let cartOBJ=JSON.parse(cartLS);
      cartOBJ=carrito;
      
     const cartLsNew=JSON.stringify(cartOBJ);
     
     localStorage.setItem("carrito",cartLsNew)

     
  }