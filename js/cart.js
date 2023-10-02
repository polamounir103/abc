// JavaScript for horizontal scroll
const scrollContainer = document.querySelector('.scrollspy-example');
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseleave', () => {
  isDown = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (isDown === false) return;
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 5; // Adjust the speed of scrolling
  scrollContainer.scrollLeft = scrollLeft - walk;
});



// ---------------------------------------
let allMainProducts = localStorage.getItem('allProducts');
if (allMainProducts) {
  allMainProducts = JSON.parse(allMainProducts);
}
console.log(allMainProducts)


let cartContainer = document.querySelector('.cartContainer')
let allCartProducts = localStorage.getItem('cart')

if (allCartProducts){
  allCartProducts = JSON.parse(allCartProducts)
}else {
  allCartProducts=[]
}

console.log(allCartProducts)



function drawCartProducts () {
    
  const cartProductsCards = allCartProducts.map( (product) => {
      
    return `<div class="cartProductCard">
    <div class="cardImgBox">
      <img src="${product.imgPath}".jpg" alt="">
    </div>
    <div class="cartProductBody">
      <p class="productTitle">${product.name}</p>
      <p>Category :  Electronis</p>
      <p class="productDescription">${product.description}</p>
      <div class="cartProductQuantity">
        <div class="cardBtns">
          <span class="btn btn-primary" onclick="quantityIncrement(${product.id})">+</span>
          <span class="productQuantity_${product.id}">${product.cartQuantity}</span>
          <span class="btn btn-danger" onclick="quantityDecrement(${product.id})">-</span>
        </div>
        <button class="deleteBtn" onclick=" deleteProductBtn (${product.id})">Delete</button>
      </div>
    </div>
</div>`
  })
  cartContainer.innerHTML = cartProductsCards.join('')
}
drawCartProducts ()



// ********************************
let cartBadgeValue = 0
let cartBadge = document.querySelector(".cartBadge")

function cartOnload () { 
  if (allCartProducts.length !== 0) {
      
      function Badge (){
          allCartProducts.map((product) => {
              // console.log( product.cartQuantity) 
              cartBadgeValue += product.cartQuantity
              cartBadge.innerHTML = cartBadgeValue
              // console.log( cartBadgeValue )              
          } )
      }
      Badge ()
  }else {
    cartBadge.style.display = "none"
    cartContainer.innerHTML = `<h2 class="emptyContainer">Cart Is Empty</h2>
    <a class="btn" href="index.html">Go Shopping</a>`
  }
}
cartOnload ()

function updateCartBadge () {
  if (allCartProducts.length !== 0) {
    cartBadgeValue = 0
    allCartProducts.map(function (product) {
      let quantity = product.cartQuantity
      cartBadgeValue += quantity
    })
    cartBadge.innerHTML = cartBadgeValue
  }else {
    cartBadge.style.display = "none"
    cartContainer.innerHTML = `<h2 class="emptyContainer">Cart Is Empty</h2>
    <a class="btn" href="index.html">Go Shopping</a>`
  }
}
// *********************************


function quantityIncrement(id) {
  let index = allCartProducts.findIndex((item) => item.id === id) 
  console.log(index)
   allCartProducts[index].cartQuantity ++
  console.log(allCartProducts[index])
  let productQuantityText = document.querySelector (`.productQuantity_${allCartProducts[index].id}`) 
  productQuantityText.innerHTML = allCartProducts[index].cartQuantity
  cartBadgeValue ++
  cartBadge.innerHTML = cartBadgeValue
  localStorage.setItem('cart' , JSON.stringify(allCartProducts) )
}

function quantityDecrement(id) {
  let index = allCartProducts.findIndex((item) => item.id === id) 
  if (allCartProducts[index].cartQuantity > 1 ) {
    let productQuantityText = document.querySelector (`.productQuantity_${allCartProducts[index].id}`) 
    console.log(index)
    allCartProducts[index].cartQuantity --
    console.log(allCartProducts[index])
    productQuantityText.innerHTML = allCartProducts[index].cartQuantity
  }else {
    // allCartProducts[index].cartQuantity --
    allCartProducts.splice(index, 1);
    drawCartProducts();
    localStorage.setItem('cart', JSON.stringify(allCartProducts));

  }
 
  updateCartBadge ()
  
  localStorage.setItem('cart' , JSON.stringify(allCartProducts) )

}
// ***************  Delete All Cart   ****************
function deleteProductBtn(id) {
  let index = allCartProducts.findIndex((item) => item.id === id);
  if (index !== -1) {
    allCartProducts.splice(index, 1);
    drawCartProducts();
    localStorage.setItem('cart', JSON.stringify(allCartProducts));
    updateCartBadge();
  }
}



// ---------------------------------------------------
// **********************************************
let favoriteContainer = document.querySelector('.favoriteContainer')
let allFavoriteProducts = localStorage.getItem('favorites')

if (allFavoriteProducts){
  allFavoriteProducts = JSON.parse(allFavoriteProducts)
}

console.log(allFavoriteProducts)
function drawFavoriteProducts () {
  if (allFavoriteProducts.length > 0) {

    let favoriteLength = allFavoriteProducts.length
    console.log( favoriteLength)
    let indexID = 0
    const favoriteProductsCards = allFavoriteProducts.map( (product) => {
      indexID ++
      
      return `<div id="list-item-${indexID}"  class="scrollCard bg-light favoriteCard">
      <div class="favoriteImgBox ">
      <img src="${product.imgPath}" alt="" class="favoriteImg"  draggable="false">
      </div>
      <div class="favoriteCardText">
      <h2 class="favoriteName">${product.name}</h2>
      <button class=" favoriteIcon" onclick="favoriteProduct (${product.id})" onclick><i class="fas fa-heart"></i></button>
      </div>
      </div>`
    })
    favoriteContainer.innerHTML = favoriteProductsCards.join('')
  }else {
    favoriteContainer.innerHTML = `<div class="emptyFavorite">
    <h2>No Favorite Item</h2>
  </div>`
  }
}
 drawFavoriteProducts ()



function favoriteProduct (id) {

    let index = allFavoriteProducts.findIndex((item) => item.id === id)
    let favoriteProduct = allFavoriteProducts[index]
    allFavoriteProducts.splice(favoriteProduct, 1)

    let reIndex = allMainProducts.findIndex((item) => item.id === id)
    allMainProducts[reIndex].favorite = false

    
    localStorage.setItem("favorites" , JSON.stringify(allFavoriteProducts))
    localStorage.setItem("allProducts" , JSON.stringify(allMainProducts))
    drawFavoriteProducts ()
}




// ..........................................
let circlesBox = document.querySelector('.circlesBox')

function drawFavoriteCircles () {
  if (allFavoriteProducts.length > 0) {

    let favoriteLength = allFavoriteProducts.length 
    let index = favoriteLength/3
    // let index = Math.
    console.log( favoriteLength)
    let circleNo = Math.floor(favoriteLength/3)
    console.log( circleNo)
    if (favoriteLength < 6 && favoriteLength < 6 && favoriteLength != 0) {
      circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-1"></a> `
      circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${favoriteLength}"></a> `
    } else {
      circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-1"></a> `
      let temp = 3
      let temp2 = 3
      console.log( temp)
      for (let i = 1; i < circleNo  ; i ++ ) {
        temp2 = temp + i
        if (temp2 < favoriteLength) {
          circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${i+temp}"></a> `
          temp += 3
        }
      }
      circlesBox.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${favoriteLength}"></a> `
    }
    
  }
}
drawFavoriteCircles () 