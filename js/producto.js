// Pasos para QS
let qs = location.search; // Obtener la qs de la url
let qsto = new URLSearchParams(qs); // Transformar la qs en un Objeto Literal
let id = qsto.get('id'); // Obtener el dato de id del objeto literal. qsto = query string to object

// Armar un nuevo fetch
let url = 'https://fakestoreapi.com/products/' + id;

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(product) {
        // Paso 1: capturar DOM.
        let productName = document.getElementById('product-name');
        let productDescription = document.getElementById('product-description');
        let productPrice = document.getElementById('product-price');
        let productImage = document.getElementById('product-image');
        let productCategory = document.getElementById('product-category');
        let addToCartButton = document.getElementById('add-to-cart');

        // Paso 2 y 3: actualizar datos y actualizar DOM;
        productName.innerText = product.title;
        productDescription.innerText = product.description;
        productPrice.innerText = '$' + product.price;
        productImage.src = product.image;
        productCategory.innerText = product.category;
        productCategory.href = 'category.html?category=' + encodeURIComponent(product.category);

        addToCartButton.addEventListener('click', function() {
            let cart = localStorage.getItem('cart');
            if (cart) {
                cart = JSON.parse(cart);
            } else {
                cart = [];
            }
            cart.push(product.id);
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    })
    .catch(function(error) {
        console.log(error);
    });
