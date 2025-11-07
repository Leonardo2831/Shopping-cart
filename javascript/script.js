const contentProducts = document.querySelector('[data-content="products"]');

let contentHtmlProducts = '';

export function formatPrice(price){
    const formattedPrice = 
        price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });

    return formattedPrice;
}

function successRequest(res){
    contentProducts.innerHTML = '';
    contentProducts.classList.remove('empty');

    res.forEach((itemRes) => {
        const formattedPrice = formatPrice(itemRes.price);

        contentProducts.innerHTML += `
            <div
                id=${itemRes.id - 1} 
                data-category="${itemRes.category}"
            >
                <div>
                    <img src=${itemRes.image} alt=${itemRes.title} >
                    <h3>${itemRes.title}</h3>
                    <p title=${itemRes.description}>${itemRes.description}</p>
                    <p data-item="price" class="price-green">${formattedPrice}</p>
                </div>
                <button onclick="addItemCart(${itemRes.id - 1})">Adicionar ao Carrinho</button>
            </div>
        `
    });
}

function errorRequest(err){
    contentHtmlProducts = `
        <p>Ocorreu um erro, retorne mais tarde.</p>
        <b>${err.status}, ${err.statusText}</b>
    `;

    contentProducts.style.cssText = 'flex-direction: column;';

    contentProducts.innerHTML = contentHtmlProducts;
}

export let res = [];

async function requestItems(){
    try {
        const data = await (await fetch('https://fakestoreapi.com/products')).json();
        res = [...data];

        successRequest(data);
    } catch (err) {
        errorRequest(err);
    }
}

requestItems();