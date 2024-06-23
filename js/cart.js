document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-container');

    // Función para recuperar los productos del carrito desde el LocalStorage
    function getCartItems() {
        const cartItems = localStorage.getItem('cart');
        return cartItems ? JSON.parse(cartItems) : [];
    }

    // Función para mostrar los productos en el carrito
    function displayCartItems() {
        const cartItems = getCartItems();

        if (cartItems.length === 0) {
            // Si no hay productos en el carrito, mostrar mensaje
            cartContainer.innerHTML = '<p>Su carrito está vacío</p>';
        } else {
            let cartHTML = '';
            for (let i = 0; i < cartItems.length; i++) {
                const productId = cartItems[i];
                fetchProductDetails(productId, function(productHTML) {
                    cartHTML += productHTML;
                    cartContainer.innerHTML = cartHTML + getCheckoutButtonHTML();
                });
            }
        }
    }
    function getCheckoutButtonHTML() {
        return '<button class="checkout-btn">Finalizar Compra</button>';
    }

    // Función para obtener los detalles de un producto desde la API
    function fetchProductDetails(productId, callback) {
        fetch('https://fakestoreapi.com/products/' + productId)
            .then(function(response) {
                return response.json();
            })
            .then(function(product) {
                const productHTML = `
                    <div class="product">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p>Precio: $${product.price}</p>
                    </div>
                `;
                callback(productHTML);
            })
            .catch(function(error) {
                console.log('Error al obtener los detalles del producto:', error);
            });
    }

    function checkout() {
        // Eliminar los productos del carrito de LocalStorage
        localStorage.removeItem('cart');
        alert('Gracias por su compra.');

        // Redirigir al usuario a la página principal
        window.location.href = 'index.html';
    }
    cartContainer.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('checkout-btn')) {
            checkout();
        }
    });
    displayCartItems();
});