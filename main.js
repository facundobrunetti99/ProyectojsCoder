//INGRESAR ELEMETONS MEDIANTE EL JSON AL HTML
let Productos=[
  
  {id:1,
    name:"RTX 3090",
    img:"/images/img6.jpg",
    price:325000,

    },
    {
    id:2,
    name:"GTX 2070",
    img:"/images/img7.jpg",
    price:223000,

    },
    
    {
    id:3,
    name:"GTX 1060",
    img:"/images/img8.jpg",
    price:65000,

    },
    
    {
    id:4,
    name:"GTX 2090",
    img:"/images/img9.jpg",
    price:128000,

    },
    
    {
    id:5,
    name:"RX 750 TI",
    img:"/images/img10.jpg",
    price:37000,

    },
    
    {
    id:6,
    name:"Gabinete Gamer 330i",
    img:"/images/img11.jpg",
    price:44000,
    },
    
    {
    id:7,
    name:"Gabinete gamer 44001",
    img:"/images/img12.jpg",
    price:16500,

    },
    
    {
    id:8,
    name:"Gabinete gamer Iqual",
    img:"/images/img13.jpg",
    price:18520,

    },
    
    {
    id:9,
    name:"Mouse lgt23",
    img:"/images/img14.jpg",
    price:4300,

    },
    
    {
    id:10,
    name:"Mouse Logitech 430",
    img:"/images/img15.jpg",
    price:11300,

    },
    
    {
    id:11,
    name:"Mouse zaino",
    img:"/images/img16.jpg",
    price:7200,

    },
    
    {
    id:12,
    name:"Monitor LCD 32",
    img:"/images/img17.jpg",
    price:6500,

    },
    
    {
    id:13,
    name:"Monitor 144hz",
    img:"/images/img18.jpg",
    price:23500,

    },
    
    {
    id:14,
    name:"Auriculares osirus",
    img:"/images/img26.jpg",
    price:12500,
 
    },
    
    {
    id:150,
    name:"Teclado Mecanico pink",
    img:"/images/img1.jpg",
    price:21800,

    },
    
    {
    id:16,
    name:"Auriculares Redragon",
    img:"/images/img20.jpg",
    price:7500,
 
    },
    
    {
    id:17,
    name:"Teclado RGB 2230",
    img:"/images/img2.jpg",
    price:10390,
 
    },
    
    {
    id:18,
    name:"Teclado Retroiluminado",
    img:"/images/img3.jpg",
    price:12370,
  
    },
    
    {
    id:19,
    name:"Teclado Black RGB",
    img:"/images/img5.jpg",
    price:18500,
  
    },
    
    {
    id:20,
    name:"Teclado Black/White",
    img:"/images/img4.jpg",
    price:8300,
    
    }
    
]

let carrito=[];
//INICIO DE INGRESAR TODO A LA PAGINA
const seleccionCarrito=document.querySelector('.conteiner');
Productos.forEach((product,i)=>{
  const divDelProducto=document.createElement("div");
  divDelProducto.classList.add("conteiner","col-sm-6","col-md-4","col-lg-3","contendor--card")
  
  divDelProducto.innerHTML=`
  <div class="card" style="width: 100%;">
  <img src="${product.img}" class="img-tamaño" alt="...">
  <div class="card-body">
    <h5 class="card--title">${product.name}</h5>
    <p class="card--text">$ ${product.price}</p>
    <button class="button--card" onClick="addTocart(${product.id},${i})">Comprar</button>
  </div>
</div>`
seleccionCarrito.appendChild(divDelProducto);
})







//INICIO DE AGREGAR AL CARRITO PUSH CARRITO
const carritoAgregar=document.querySelector('.conteiner conteiner__cart');

function addTocart(indice,i){
  let ina=indice;
  let ia=i;
  index=carrito.findIndex((element)=>{
    return element.id===Productos[i].id
  }
  );

   
  if(index===-1){
    const productoAgregar=Productos[ia];
    productoAgregar.cant=1;
    carrito.push(productoAgregar);
    carritoDibujar(productoAgregar);
    sumaCarrito();
  }else{
  carrito[index].cant+=1
  carritoDibujar(carrito[index]);
  sumaCarrito();
  }

}



//AGREGAR HTML AL CARRITO
const selecionCart=document.querySelector('.conteiner__cart')

function carritoDibujar(data){

  const div=document.createElement("div");
  div.classList.add("conteiner__cart--item");
  const title=selecionCart.querySelectorAll('.title__cart--item')

  carrito.forEach((element,i)=>{
   
    if(data.cant>1){
      title.forEach((titles)=>{
          if(titles.textContent===data.name){
              const divT=titles.closest('.conteiner__cart--item')
              const valueT=divT.querySelector('.cantidad__cart--item')
              valueT.value=data.cant;
          }
      })

    }else if(data.cant!=0 && data.cant===1){
     
    div.innerHTML=`
    <div class="conteiner--title--img">
    <img src="${element.img}" alt="" class="img__cart--item">
        <p class="title__cart--item"><b>${element.name}</b></p>
    </div>
    <p class="precio__cart--item"><b>$${element.price}</b></p>
  
    <input type="number" class="cantidad__cart--item" value="${element.cant}">
    <button class="eliminar__cart--item" onClick="eliminarItemCart(${element.id},${i},${element.cant})">X</button>


    `;
    selecionCart.appendChild(div)
    cambiarValue(element.id,element.cant)
   
    }

  })


}

//SUMA TOTAL
const TotalHTML=document.querySelector('.texto__precio')
function sumaCarrito(){
  let total=0;
  carrito.forEach((element)=>{
    total=element.price*element.cant+total
  })
  TotalHTML.innerHTML=`<b class="precioHTML">TOTAL $${total}</b>`
}


//FUNCION ELIMAR ITEMS DE UN CARRITO
function eliminarItemCart(idItem,posicionCarrito,cant){
  const title=selecionCart.querySelectorAll('.title__cart--item')

  carrito.forEach((element,i)=>{
    if(element.id===idItem){
      if(element.cant===1){
        title.forEach((titulo)=>{
          if(titulo.textContent===element.name){
               const divElminar=titulo.closest('.conteiner__cart--item');
               divElminar.remove()
               carrito.splice(i,1);
              sumaCarrito()
          }
       })  
      }else if(element.cant!=0){
        title.forEach((titulo)=>{
          if(titulo.textContent===element.name){
               const divCambiarCant=titulo.closest('.conteiner__cart--item');
               const valueCant=divCambiarCant.querySelector('.cantidad__cart--item');
               console.log(valueCant.cant)
              element.cant--;
               valueCant.value=element.cant;
               sumaCarrito()
          }

       }) 
      }
    }
  })  


}

//CAMBIAR LA CANTIDAD DEL VALUE

function cambiarValue(cantidad, id){
    const valueALL=document.querySelectorAll(".cantidad__cart--item");
    valueALL.forEach((element)=>{

      element.addEventListener('change',modificarCant)
    }
    )
    function modificarCant(event){
      const item=event.target;
      const titulos=item.closest('.conteiner__cart--item')
      const titulo1=titulos.querySelector('.title__cart--item')
        if(Number(item.value)<1){
          item.value=1;
        }else{
          carrito.forEach((element)=>{
            if(titulo1.textContent===element.name){       
              element.cant=Number(item.value);
              sumaCarrito()
            }      
          })
        }
    }

}