import { menuArray } from "./data.js";

let menu = document.getElementById("menu");
let liModal = document.getElementById('li-modal')
let orderModal = document.getElementById('order-modal')

function getMenuHtml(){

let html = "";

menuArray.forEach(item => {
    html += `
    <div class="items">
    <h1 class="icons">${item.emoji}</h1>
    <div class="sub-menu">
        <h2>${item.name}</h2>
        <p class="paragraph">${item.ingredients}</p>
        <h2>$${item.price}</h2>
    </div>
    <button data-order="${item.id}" class="add">+</button>
</div>

<hr>
    `;
  });
  return html
}

function render(){
    menu.innerHTML = getMenuHtml();
  }

  render()

function handleOrders(order) {
    let orderList = menuArray

    let selectedOrder = orderList.find(item => item.id == order);
    return selectedOrder;
  }

let toggleCalled = false;

let totalPrice = 0;

document.addEventListener('click', function(e) {
  if(e.target.dataset.order) {
    if (!toggleCalled) {
      orderModal.classList.toggle('order-section');
      toggleCalled = true;
    }
    let selectedOrder = handleOrders(e.target.dataset.order);
    liModal.innerHTML += `
      <div id="${selectedOrder.id}" class="list-orders">
        <h3>${selectedOrder.name}</h3>
        <button id='remove-btn' class="remove-btn-modal">Remove</button>
        <h3 class="li-modal-price">$${selectedOrder.price}</h3>
        </div>`;
    totalPrice += selectedOrder.price;
  }
  document.getElementById("tot-price").innerHTML = `
  <h3>Total Price</h3>
  <h3 id="tot-price" class="li-modal-price">$${totalPrice.toFixed(2)}</h3>
  `
});

liModal.addEventListener('click', function(e) {
  if (e.target.matches('.remove-btn-modal')) {
    let div = e.target.closest('div');
    let price = div.querySelector('.li-modal-price').innerText;
    price = parseFloat(price.substring(1));
    totalPrice -= price;
    document.getElementById("tot-price").innerText = totalPrice.toFixed(2);
    div.remove();
  }
});

let orderBtn = document.getElementById("complete-order")
let modalInner = document.getElementById('modal-inner')
let toggleSecond = false;

  orderBtn.addEventListener('click', function(){
    if (!toggleSecond) {
      modalInner.classList.toggle('modal-inner');
      toggleSecond = true;
    }
  })

  let cardForm = document.getElementById('card-details')

  cardForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(cardForm)
    const fullName = consentFormData.get('fullName')

    orderModal.innerHTML = `<div class="finish-msg"><h1 class="thanks-msg">Thanks, ${fullName}! Your order is on it's way!</h1></div>`

    modalInner.style.display = "none";
  })





