// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el contenedor donde se mostrarán los productos del carrito
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
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Su carrito está vacío';
            cartContainer.appendChild(emptyMessage);
        } else {
            // Si hay productos, pedir a la API la información de cada uno y mostrarlos
            for (let i = 0; i < cartItems.length; i++) {
                // Obtener el ID del producto actual
                const productId = cartItems[i];

                // Obtener información del producto desde la API
                fetchProductDetails(productId);
            }

            // Crear y mostrar el botón "Finalizar Compra"
            const checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Finalizar Compra';
            checkoutButton.className = 'checkout-btn';
            checkoutButton.addEventListener('click', checkout);
            cartContainer.appendChild(checkoutButton);
        }
    }

    // Función para obtener los detalles de un producto desde la API
    function fetchProductDetails(productId) {
        fetch('https://fakestoreapi.com/products/' + productId)
            .then(function(response) {
                return response.json();
            })
            .then(function(product) {
                // Crear elemento para mostrar el producto en el carrito
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>Precio: $${product.price}</p>
                `;

                // Añadir el producto al contenedor del carrito
                cartContainer.insertBefore(productElement, cartContainer.lastChild);
            })
            .catch(function(error) {
                console.log('Error al obtener los detalles del producto:', error);
            });
    }

    // Función para manejar el proceso de finalizar la compra
    function checkout() {
        // Eliminar los productos del carrito de LocalStorage
        localStorage.removeItem('cart');
        
        // Agradecer al usuario por su compra
        alert('Gracias por su compra.');

        // Redirigir al usuario a la página principal
        window.location.href = 'index.html';
    }

    // Llamar a la función para mostrar los productos del carrito al cargar la página
    displayCartItems();
});
