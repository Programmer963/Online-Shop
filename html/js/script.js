const thingsDiv = document.querySelector('.things');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
let login = JSON.parse(localStorage.getItem('login')) || []
const btnLogin = document.querySelector('.login')
if(login.length !== 0){
  btnLogin.textContent = "Name"  
}

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    data.products.forEach(element => {
      const title = element.title;
      const image = element.images[0];
      const price = element.price;
      const description = element.description;

      const itemHTML = `
        <img class="thing-img" src="${image}">
        <div align="center" class="thing-div">
          <p class="thing-div-p">${title}</p>
          <div>
            <p style="font-size: 20px;">${price}$</p>
            <button class="addBtn">В корзину</button>
          </div>
        </div>`;

      const item = document.createElement('div');
      item.className = "thing";
      item.innerHTML = itemHTML;

      thingsDiv.append(item);
      const addBtn = item.querySelector(".addBtn");
      
      addBtn.addEventListener('click', function () {
        if(login.length !== 0){

          const existingItemIndex = cartItems.findIndex(item => item.title === title);
          
          if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity++;
          } else {
            cartItems.push({ title, image, description, price, quantity: 1 });
          }
          
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
        else{
          alert("Зайдите в аккаунт чтобы положить товары в корзину покупку")
          window.location.href = "login.html"
        }
      });

    })
      


    });

const search = document.querySelector('.search-input')
const btn = document.querySelector('.searchBtn')

function Search() {
    const searchText = search.value.toLowerCase()
    const thing = document.querySelectorAll('.thing')

    // const things = document.querySelector('.things')
    thing.forEach(item => {
        const thingName = item.querySelector('p').innerText.toLowerCase()
        if (thingName.includes(searchText)) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    });
    search.value = ''
}
btn.addEventListener('click', Search)

const btnSort = document.querySelector('.sortBtn')
const selectCategory = document.getElementById('sort-select')

btnSort.addEventListener('click', () => {
fetch('https://dummyjson.com/products')
.then(response => response.json())
.then(data => {
  let selectedCategory = selectCategory.value;
  let products = data.products;
  let foundProducts = products.filter(element => element.category.includes(selectedCategory));
  thingsDiv.innerHTML = ''
  if (foundProducts.length > 0) {
    foundProducts.forEach(element => {
        const itemHTML = `
              <img class="thing-img" src="${element.images[0]}">
              <div align="center" class="thing-div">
                <p class="thing-div-p">${element.title}</p>
                <div>
                  <p style="font-size: 20px;">${element.price}$</p>
                  <button class="addBtn">В корзину</button>
                </div>
        </div>`;
        const item = document.createElement('div');
        item.className = "thing";
        item.innerHTML = itemHTML;
        thingsDiv.append(item);
    })
    }
  })
})

// const addBtn = item.querySelector(".addBtn");              
// addBtn.addEventListener('click', function () {
//   const existingItemIndex = cartItems.findIndex(item => item.title === title);
//   if (existingItemIndex !== -1) {
//     cartItems[existingItemIndex].quantity++;
//   } else {
//   cartItems.push({ title, image, description, price, quantity: 1 });
// }
// localStorage.setItem("cartItems", JSON.stringify(cartItems));
// });