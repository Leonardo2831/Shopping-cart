let htmlCartContent = '';
let valueCart = 0;

function totalValueCart(){
    const infosCartValue = $('[data-cart="value"]');
    
    infosCartValue.text(
        valueCart
        .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    );
}

totalValueCart();

function addItemCart(idContent){
    const contentCart = $('[data-cart="items"]');

    $.ajax({
        url: './data/products.json', 
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
                        <h4>${dataItem.name}</h4>
                        <span data-cart="price">${formattedPrice}</span>
                    </div>
                    <div>
                        <img src=${dataItem.image} alt=${dataItem.name}>
                        <button onclick="removeItemCart(this)">Remover</button>
                    </div>
                </li>
            `;

            contentCart.html(htmlCartContent);
            totalValueCart();
        },
        error: function(err){
            htmlCartContent += `
                <li class="card-infos-products">
                    <p>
                        Erro ao adicionar ao carrinho, retorne   novamente mais tarde.
                        <br>
                        <br>
                        <b>${err.statusText}, ${err.status}</b>.
                    </p>
                </li>
            `;

            contentCart.html(htmlCartContent);
        }
    });

    
}

function removeItemCart(button){    
    const contentValue = $(button).parents('li');
    const contentCart = $('[data-cart="items"]');

    const priceText = contentValue.find('span').text().trim();

    const convertedToNumeric = parseFloat(
        priceText
            .slice(3, priceText.length)
            .replace('.', '')
            .replace(',', '.')
    );

    if(convertedToNumeric != NaN){
        valueCart -= convertedToNumeric;
        totalValueCart();
    }

    contentValue.remove();
    htmlCartContent = contentCart.html();

    if(htmlCartContent.trim() == ''){
        contentCart.html('<p class="empty-cart">Seu carrinho está vazio</p>');
    }
}
