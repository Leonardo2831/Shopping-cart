$(function(){
    const contentProducts = $('[data-content="products"]');

    let contentHtmlProducts = '';

    function successRequest(res){
        res.products.forEach((itemRes) => {
            
            const formattedPrice = 
                itemRes.price
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

            contentHtmlProducts += `
                <div id=${itemRes.id - 1}>
                    <img src=${itemRes.image} alt=${itemRes.name}>
                    <h3>${itemRes.name}</h3>
                    <p>${itemRes.description}</p>
                    <p data-item="price" class="price-green">${formattedPrice}</p>
                    <button onclick="addCart(${itemRes.id - 1})">Adicionar ao Carrinho</button>
                </div>
            `;

            contentProducts.html(contentHtmlProducts);
        });

        contentProducts.html(contentHtmlProducts);
    }

    function errorRequest(err){
        contentHtmlProducts = `
            <p>Ocorreu um erro, retorne mais tarde.</p>
            <b>${err.status}, ${err.statusText}</b>
        `;

        contentProducts.css({
            'flex-direction': 'column',
        });

        contentProducts.html(contentHtmlProducts);
    }

    $.getJSON('./data/products.json')
        .done(successRequest)
        .fail(errorRequest)
        .always();
});