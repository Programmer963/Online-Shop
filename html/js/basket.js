const savedBasketItems = JSON.parse(localStorage.getItem('cartItems'));

const basketContainer = document.querySelector('.basket-items');

let sum = 0;

savedBasketItems.forEach((item) => {
    const { title, image, description, price, quantity } = item;
    
    sum += price * quantity;
    
    const itemHTML = `
    <div class="basket-item">
    <div class="img-div">
    <img class="basket-item-img" src="${image}">
    </div>
    <div class="title-div">
    <p class="basket-item-p">${title}</p>
    <p class="p-description">${description}</p>
    <div class="clicker-div">
    <div class="clicker-container">
    <button class="btnClicker btnMinus">-</button>
    <p class="quantity">${quantity}</p>
    <button class="btnClicker btnPlus">+</button>
    </div>
    <p class="price">Цена: ${price}$</p>
    </div>
    </div>
    </div>`;
    basketContainer.innerHTML += itemHTML;
    
    
});



const btnMinus = basketContainer.querySelectorAll('.btnMinus');
const btnPlus = basketContainer.querySelectorAll('.btnPlus');
const quantityElements = basketContainer.querySelectorAll('.quantity');

const cell = document.querySelector('.cell');


cell.innerHTML = `
<p class="pCell">Сумма всех товаров: ${sum}$</p>`

const btnCell = document.querySelector('.btnCell');


quantityElements.forEach((quantityElement, index) => {
    btnMinus[index].addEventListener('click', () => {
        if (savedBasketItems[index].quantity > 1) {
            savedBasketItems[index].quantity--;
            quantityElement.textContent = savedBasketItems[index].quantity;
            updateSum();
        }
    });
    
    btnPlus[index].addEventListener('click', () => {
        savedBasketItems[index].quantity++;
        quantityElement.textContent = savedBasketItems[index].quantity;
        updateSum();
    });
    
});

function updateSum() {
    sum = savedBasketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cell.innerHTML = `
    <p class="pCell">Сумма всех товаров: ${sum}$</p>
    `;
    localStorage.setItem('cartItems', JSON.stringify(savedBasketItems));
}

btnCell.addEventListener('click', function() {
    localStorage.removeItem('cartItems');
    window.location.href = "catalog.html"
    alert('Покупка успешно!');
});