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
              <button class="card-btn">Agregar
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

 const isLastIndexOf = () =>
  productsController.nextProductsIndex === productsController.productsLimit;
  
 const showMoreProducts = () => {
  renderProducts(productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add("hidden");
  }
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


  const togleMenu = () =>{
    barsMenu.classList.toggle(`open-menu`);
    };

  
    
    
    
    const init = () => {
        barsBtn.addEventListener("click",togleMenu);
        renderProducts();
         categories.addEventListener("click", applyFilter);
         btnLoad.addEventListener("click", showMoreProducts);

    };
    
    init();