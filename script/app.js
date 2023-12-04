const products = {
  crazy: {
    name: 'Crazy',
    price: 31000,
    img: 'images/products/burger-1.png',
    amount: 0,
    get totalSumm(){
      return this.price * this.amount
    }
  },
  light: {
    name: 'Light',
    price: 26000,
    img: 'images/products/burger-2.png',
    amount: 0,
    get totalSumm(){
      return this.price * this.amount
    }
  },
  cheeseburger: {
    name: 'CheeseBurger',
    price: 29000,
    img: 'images/products/burger-3.png',
    amount: 0,
    get totalSumm(){
      return this.price * this.amount
    }
  },
  dburger: {
    name: 'dBurger',
    price: 24000,
    img: 'images/products/burger-4.png',
    amount: 0,
    get totalSumm(){
      return this.price * this.amount
    }
  },
}
// products.cheeseburger.amount = 5
// console.log(products.cheeseburger.totalSumm);

const basketBtn = document.querySelector('.wrapper__navbar-btn');
const basketModal = document.querySelector('.wrapper__navbar-basket');

basketBtn.addEventListener('click', function () {  
  basketModal.classList.add('active')
})

const productBtns = document.querySelectorAll('.wrapper__list-btn');

productBtns.forEach((btn)=>{
  btn.addEventListener('click', function () {  
    plus(this);
  })
})

function plus(btn) {
  const parent = btn.closest('.wrapper__list-card');
  let parentId = parent.getAttribute('id');
  products[parentId].amount++;
  console.log(products[parentId].totalSumm);
  basket();
}

const basketBtnCount = document.querySelector('.warapper__navbar-count');
const basketChecklist = document.querySelector('.wrapper__navbar-checklist');
const basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice');

function basket() {
  const productArray = [];
  let totalCount =0;
  let totalSummProducts = 0;
  for (const key in products) {
    const prod = products[key];
    const productCard = document.querySelector(`#${key}`);
    const cardCount = productCard.querySelector('.wrapper__list-count');
    cardCount.innerHTML = prod.amount;
    if (prod.amount > 0) {
      cardCount.classList.add('active');
      productArray.push(prod);
      totalCount += prod.amount;
      totalSummProducts += prod.totalSumm;
    } else {
      cardCount.classList.remove('active');
    }
  }
  basketTotalPrice.innerHTML = totalSummProducts;
  basketBtnCount.innerHTML = totalCount;
  totalCount ? basketBtnCount.classList.add('active') : basketBtnCount.classList.remove('active');
  basketChecklist.innerHTML = '';
  productArray.forEach((burger)=>{
    basketChecklist.innerHTML += checkListItem(burger);
  })
}

function checkListItem (burger) {
  const {name, totalSumm: price, amount, img} = burger;
  return `<div class="wrapper__navbar-product">
  <div class="wrapper__navbar-info">
      <img class="wrapper__navbar-productImage" src="${img}" alt="">
      <div class="wrapper__navbar-infoSub">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice"><span>${price.toLocaleString()}</span> сум</p>
      </div>
  </div>
  <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
      <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      <output class="wrapper__navbar-count">${amount}</output>
      <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
  </div>
</div>`
}

document.addEventListener('click', (e)=>{
  const btn = e.target;
  if(btn.classList.contains('wrapper__navbar-symbol')) {
    let attr = btn.getAttribute('data-symbol');
    const parent = btn.closest('.wrapper__navbar-option');
    let productId = parent.getAttribute('id').split('_')[0];
    if(attr == '+') {
      products[productId].amount++;
    } else {
      products[productId].amount--;
    }
    basket();
  }
})
// basketBtn.addEventListener('click', (e)=>{
//   e.stopPropagation();
//   console.log('bask');
// })

const closeModal = document.querySelector('.wrapper__navbar-close');
closeModal.addEventListener('click', function () {  
  basketModal.classList.remove('active');
})

const btnCard = document.querySelector('.wrapper__navbar-bottom');
const print__body = document.querySelector('.print__body');
const print__footer = document.querySelector('.print__footer');

btnCard.addEventListener('click', function () {  
  print__body.innerHTML = '';
  let totalSummProducts = 0;
  for (const key in products) {
    let {name, totalSumm, amount} = products[key];
    if (amount > 0) {
      totalSummProducts += totalSumm;
      print__body.innerHTML += `<div class="print__body-item">
          <p class="print__body-item_name">
              <span class="name">${name}</span>
              <span class="count">${amount}</span>
          </p>
          <p class="print__body-item_summ">${totalSumm}</p>
      </div>`
    }
  }
  print__footer.innerHTML = totalSummProducts;
  window.print()
})
