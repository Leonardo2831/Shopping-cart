const buttonFilter = document.querySelector('[data-filter]');

function filterCategory(){
    const products = document.querySelectorAll('[data-category]');
    const classFilter = 'filterItem';

    buttonFilter.dataset.filter = buttonFilter.value;

    products.forEach((product) => {

        if(buttonFilter.value === '' || product.dataset.category == buttonFilter.value){
            product.classList.remove(classFilter);
        } else if(product.dataset.category != buttonFilter.value){
            product.classList.add(classFilter);
        }

    });
}

buttonFilter.addEventListener('change', filterCategory);