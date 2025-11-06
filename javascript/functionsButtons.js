import { formatPrice } from "./script.js";
import { res } from './script.js'

let htmlCartContent = '';
let valueCart = 0;

function totalValueCart(){
    const infosCartValue = document.querySelector('[data-cart="value"]');
    
    infosCartValue.textContent = formatPrice(valueCart);
}
totalValueCart();

function addItemCart(idContent){
    const contentCart = $('[data-cart="items"]');

    $.ajax({
        url: '../data/products.json', 
        method: 'GET',
        type: 'json', 
        success: function(res){
            const dataItem = res.products[idContent];
            valueCart += dataItem.price;
            const formattedPrice = 
                dataItem.price
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    });

    htmlCartContent += `
        <li class="card-infos-products">
            <div>
                <h4>${dataItem.title}</h4>
                <span data-cart="price">${formattedPrice}</span>
            </div>
            <div>
                <img src=${dataItem.image} alt=${dataItem.title}>
                <button onclick="removeItemCart(this)">Remover</button>
            </div>
        </li>
    `;

    contentCart.innerHTML = htmlCartContent;
    totalValueCart();
}

window.removeItemCart = (button) => {    
    const contentValue = button.closest('li');
    const contentCart = document.querySelector('[data-cart="items"]');

    const priceText = contentValue.querySelector('[data-cart="price"]').textContent.trim();
    const convertedToNumeric = parseFloat(priceText.replace('$', ''));

    if(convertedToNumeric != NaN){
        valueCart -= convertedToNumeric;
        totalValueCart();
    }

    contentValue.remove();
    htmlCartContent = contentCart.innerHTML;

    if(htmlCartContent.trim() == ''){
        contentCart.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    }
}
