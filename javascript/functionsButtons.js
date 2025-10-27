let htmlCartContent = '';

function addCart(button){
    const cartContentId = button.parentNode;
    console.log(button);
    
    $.ajax({
        url: './data/products.json', 
        type: 'json', function(res){
            const dataItem = res.products[cartContentId];
            const formattedPrice = 
                dataItem.price
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    });

            htmlCartContent += `
                <li class="card-infos">
                    <div>
                        <h4>${dataItem.name}</h4>
                        <span data-cart="price">${formattedPrice}</span>
                    </div>
                    <div>
                        <img src="images/18.jpg" alt="teste">
                        <button onclick="removeCart(this)">Remover</button>
                    </div>
                </li>
            `;
        }
    });

    
}

function removeCart(button){

}