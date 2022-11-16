const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const grande = document.querySelector(`.carrousel-img`);
const punto = document.querySelectorAll(`.punto`);
const products = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBtn = document.querySelector(".cart-label");
const overlay = document.querySelector(".overlay");
const deleteBtn = document.querySelector(".btn-delete");
const successModal = document.querySelector(".add-modal");
const cartMenu = document.querySelector(".cart");

// setear el array para el carro
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// funcion para guardar en el local storage
const saveLocalStorage = (cartList) =>{
    localStorage.setItem("cart", JSON.stringify(cartList));
};

//Funcion para crear el HTML a renderizar
const createHtml = (product)=>{
  const { name, price, cardImg } = product;

    return `
    <div class="card">
            <div class="card-img"><img src=${cardImg} alt="user"/></div>
            <div class="card-info">
              <h3>${name}</h3>
              <span>$${price}</span>
              <button class="card-btn btn-add">Agregar
              </button>
            </div>
          </div>`;
};


//funcion para renderizar los productos divididos.
const renderDivededProducts = (index = 0) =>{
   products.innerHTML += productsController.dividedProducts[index]
  .map(createHtml)
   .join("");
 };

 const renderFilteredProducts = (category) =>{
   const productsList = productsData.filter((product )=> product.category === category);


 products.innerHTML = productsList.map(createHtml).join("");
 };

 //funcion para renderizar los productos
 const renderProducts = (index = 0, category = undefined)=>{
   if(!category) {
     renderDivededProducts(index);
     return;
  }
   renderFilteredProducts(category);
   };

 //Logica de filtros
 const changeShowMoreBtnState = (category) => {
   if (!category) {
     btnLoad.classList.remove("hidden");
     return;
   }
   btnLoad.classList.add("hidden");
 };

 const changeBtnActiveState = (selectedCategory) => {
   const categories = [...categoriesList];
   categories.forEach((categoryBtn) => {
     if (categoryBtn.dataset.category !== selectedCategory) {
       categoryBtn.classList.remove("active");
       return;
     }
     categoryBtn.classList.add("active");
   });
 };

 const changeFilterState = (e) => {
   const selectedCategory = e.target.dataset.category;
  changeBtnActiveState(selectedCategory);
   changeShowMoreBtnState(selectedCategory);
 };

// Funcion para aplicar el filtro por categorias
 const applyFilter = (e) => {
   if (!e.target.classList.contains("category")) 
   return;
   changeFilterState(e);
   if (!e.target.dataset.category) {
     products.innerHTML = "";
     renderProducts();
    
  } else {
     renderProducts(0, e.target.dataset.category);
     productsController.nextProductsIndex = 1;
    
  }
 };


 //funcion para ver si estamos en el ulitmo array del array e productos divididos

 const isLastIndexOf = () =>
  productsController.nextProductsIndex === productsController.productsLimit;
  
 const showMoreProducts = () => {
  renderProducts(productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add("hidden");
  }
};

//logica para abrir y cerrar el carrito y mostrar el overlay

const togleMenu = () =>{
  barsMenu.classList.toggle(`open-menu`);
  if(cartMenu.classList.contains("open-cart")){
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
  };


  const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if(barsMenu.classList.contains("open-menu")){
      barsMenu.classList.remove("open-menu");
      return;
    }
    overlay.classList.toggle("show-overlay");
  };


  //funcion para cerrar menu y carrito con el scroll

  const closeOnScroll = () => {
    if (
      !barsMenu.classList.contains("open-menu") &&
      !cartMenu.classList.contains("open-cart")
    )
      return;
  
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  };
  
  const closeOnClick = (e) => {
    if (!e.target.classList.contains("navbar-link")) return;
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
  };
  
  const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  };

  //logica del carrito
  const renderCartProduct = (cartProduct)=> {
    const { id,name, price, cardImg, quantity } = cartProduct;

    return `
    <div class="cart-item">
            <div class="img-cart"><img src=${cardImg} alt="user"/></div>
            <div class="item-info">
              <h3>${name}</h3>
              <span>$${price}</span>
            </div>
            <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
          </div>`;
  }

  const renderCart = () => {
    if (!cart.length) {
      productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
      return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join("");
  };
  
  const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
  };
  
  const showTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}` ;
  };
  
  const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  };
  
  const createProductData = (id, name,price, cardImg) => {
    return { id, name,price, cardImg };
  };
  
  const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
  };

  const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
      return cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct;
    });
  };
  
  const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
  };
  
  const showSuccessModal = (msg) => {
   successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
      successModal.classList.remove("active-modal");
    }, 1500);
  };
  
  const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
  };
  
  const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
    const { id, name, price, cardImg } = e.target.dataset;
    const product = createProductData(id, name, price, cardImg);
  
    if (isExistingCartProduct(product)) {
      // Añadir una unidad
      addUnitToProduct(product);
      //Mostrar el modal de que se agrego una unidad
      showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
      //Crear el producto
      createCartProduct(product);
      //Mostrar el modal de que se agrego el producto
      showSuccessModal("El producto se ha agregado al carrito");
    }
    checkCartState();
  };
  
  const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    checkCartState();
  };
  
  const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
      return product.id === existingProduct.id
        ? { ...product, quantity: Number(product.quantity) - 1 }
        : product;
    });
  };
  
  const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
  
    if (existingCartProduct.quantity === 1) {
      if (window.confirm("Desea eliminar el producto del carrito")) {
        // borrar producto
        removeProductFromCart(existingCartProduct);
      }
      return;
    }
    // Restar uno al producto existente
    substractProductUnit(existingCartProduct);
  };
  
  const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
  };
  
  const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
      handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
      handlePlusBtnEvent(e.target.dataset.id);
    }
    checkCartState();
  };
  
  const resetCartItems = () => {
    cart = [];
    checkCartState();
  };
  
  const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
      resetCartItems();
      alert(successMsg);
    }
  };
  
  const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
  };
  
  const deleteCart = () => {
    completeCartAction(
      "¿Desea vaciar el carrito?",
      "No hay productos en el carrito"
    );
  };


  punto.forEach((cadaPunto, i)=>{
       punto[i].addEventListener(`click`,()=>{
         let posicion = i
           let operacion = posicion * -25

           grande.style.transform = `translateX(${operacion}%)`

          punto.forEach((cadaPunto,i)=>{
             punto[i].classList.remove(`activo`)
           })
          punto[i].classList.add(`activo`)


       })
   })


  
    
    
    
    const init = () => {
        renderProducts();
         categories.addEventListener("click", applyFilter);
         btnLoad.addEventListener("click", showMoreProducts);
         barsBtn.addEventListener("click",togleMenu);
        cartBtn.addEventListener("click",toggleCart);
        window.addEventListener("scroll", closeOnScroll);
        barsMenu.addEventListener("click", closeOnClick);
        overlay.addEventListener("click", closeOnOverlayClick);
        document.addEventListener("DOMContentLoaded", renderCart);
        document.addEventListener("DOMContentLoaded", showTotal);
        products.addEventListener("click", addProduct);
        productsCart.addEventListener("click", handleQuantity);
        disableBtn(deleteBtn);
        disableBtn(buyBtn);
        buyBtn.addEventListener("click", completeBuy);
       deleteBtn.addEventListener("click", deleteCart);
  
    }
    
    init();