import { PRODUCT_OPERATIONS } from "../helpers/product-operations.js";
import { loginWithGoogle } from "../services/oauth.js";

window.addEventListener('load', function(){

    document.querySelector('#login').addEventListener('click', doLogin);
    const promise = PRODUCT_OPERATIONS.getPizza();
        promise.then(printProduct).catch(printError);
});

function doLogin(){
    loginWithGoogle();
}

function printProduct(pizzas){
     let rows = Math.ceil(pizzas.length/3);
     const productDiv = document.querySelector('#products');
     for(let i = 1; i<=rows; i++){
         const row = createRow(pizzas);
         productDiv.appendChild(row);
     }
 }
 
 function addPizzaToCart(){
     const pizzaId = this.getAttribute('product-id');
     console.log('Current Button Clicked ', pizzaId);
     const pizza = PRODUCT_OPERATIONS.search(pizzaId);
     console.log('Pizza ', pizza);
     pizza.isAddedInCart = !pizza.isAddedInCart;
     if(pizza.isAddedInCart){
         this.className = 'btn btn-outline-danger';
         this.innerText = 'Remove from Cart';
         PRODUCT_OPERATIONS.addToCart(pizza);
     }
     else{
         this.className = 'btn btn-outline-success';
         this.innerText = 'Add in Cart';
         PRODUCT_OPERATIONS.removeFromCart(pizza);
     }
     
     
     printCart();
 }
 
 function computeTax(total){
     const carts = document.querySelector('#carts');
     const pTag = document.createElement('p');
     const tax = (total * 0.18);
     pTag.style.color = "red";
     pTag.innerText = `Tax 18%  ${tax.toFixed(2)}`;
     carts.appendChild(pTag);
     grandTotal(total, tax);
     return tax;
 }
 function grandTotal(total, tax) {
    const carts = document.querySelector('#carts');
    const pTag = document.createElement('p');
    pTag.style.color = "green";
    console.log("total",typeof total,parseFloat(total), typeof tax)
    // const grandTotal = (total+tax).toFixed(2);
    let grandTotal = (parseFloat(total)+parseFloat(tax));
    grandTotal = grandTotal.toFixed(2)
    console.log("grandtotal ", grandTotal)
    pTag.innerText = `Grand Total : $${grandTotal}`
    pTag.style.borderTop = '2px solid green';
    pTag.style.borderBottom = '2px solid green';
    carts.appendChild(pTag);
}

function totalSummary(){
    const total = PRODUCT_OPERATIONS.carts.reduce((acc, product)=>acc+parseFloat(product.price),0);
    const carts = document.querySelector('#carts');
    const pTag = document.createElement('p');
    const tax = computeTax(total);
    const taxWithTotal = total + tax;
    console.log('Tax With Total ', taxWithTotal);
    pTag.innerText = `Total ${taxWithTotal.toFixed(2)}`;
    
    carts.appendChild(pTag);
   
}

function printCart(){
    const carts = document.querySelector('#carts');
    carts.innerHTML = '';
    
    PRODUCT_OPERATIONS.carts.forEach(product=>{
        const pTag = document.createElement('p');
        pTag.innerText = `${product.name} ${product.price}`;
        carts.appendChild(pTag);
    });
     carts.appendChild(document.createElement('hr'));
    totalSummary();
    if(PRODUCT_OPERATIONS.carts.length>0){
        const placeOrder = document.createElement('button');
        placeOrder.className = 'btn btn-outline-primary';
        placeOrder.id='placeorderbtn';
        // placeOrder.style.background-color = "#198754";
        placeOrder.innerText = 'PlaceOrder';
        placeOrder.addEventListener('click', payment);  
        carts.appendChild(placeOrder);
    }
}

function payment(){
    payNow(100);
}

function createCard(pizza){
    const card = document.createElement('div');
    card.className = 'card ';
    card.style.width = '18rem';
    const image = document.createElement('img');  
    image.src = pizza.url; 
    card.appendChild(image);
    // Prepare Card Body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
     //Pizza Price
     const h6 = document.createElement('h6');
     h6.className = 'card-title';
     h6.innerText = `$${pizza.price}`; 
     //Pizza Description
     const pTag = document.createElement('p');
     pTag.innerText = `"${pizza.desc}"`;
    const addToCart = document.createElement('button');
    addToCart.setAttribute('product-id', pizza.id);
    addToCart.addEventListener('click', addPizzaToCart);
    addToCart.className = 'btn btn-outline-success';
    addToCart.innerText = 'Add to Cart';
    cardBody.appendChild(h5);
    cardBody.appendChild(h6);
    cardBody.appendChild(pTag);
    cardBody.appendChild(addToCart);
    card.appendChild(cardBody);
    return card;
}
function createRow(pizzas){
    const MAX_COL = 3;
    const row = document.createElement('div');
    row.className = 'row';
    for(let j= 1; j<=MAX_COL ; j++){
        if(pizzas.length>0){
            const column = createCol();
            const currentPizza = pizzas[0];
            //console.log('Current Pizza ', currentPizza);
            const card = createCard(currentPizza);
            pizzas.shift(); 
            column.appendChild(card);
            row.appendChild(column);
        }
       
    }
    
    return row;
}

function createCol(){
    const div = document.createElement('div');
    div.className= 'col';
    return div;
}
function printError(err){
    const h1 = document.createElement('h1');
    h1.className = 'alert-danger text-center';
    h1.innerText = 'Something Went Wrong...';
    document.querySelector('#error').appendChild(h1);
}