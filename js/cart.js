document.addEventListener('DOMContentLoaded', function() {
    // Obtener los ids de productos guardados en localStorage
    const cartIds = JSON.parse(localStorage.getItem('cart')) || [];

    // Elemento donde se mostrarán los productos del carrito
    const cartContainer = document.querySelector('.cart-container');

    // Función para obtener los detalles de los productos del carrito desde la API
    function fetchCartProducts() {
        const promises = cartIds.map(id => {
            return fetch(`https://fakestoreapi.com/products/${id}`)
                .then(response => response.json());
        });

        return Promise.all(promises);
    }

    // Función para mostrar los productos del carrito en la página
    function displayCartProducts(products) {
        // Limpiar el contenedor antes de actualizar
        cartContainer.innerHTML = '';

        // Verificar si el carrito está vacío
        if (products.length === 0) {
            cartContainer.innerHTML = '<p>Su carrito está vacío.</p>';
            return;
        }

        // Mostrar cada producto en el carrito
        products.forEach(product => {
            const productElement = document.createElement('article');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
            `;
            cartContainer.appendChild(productElement);
        });

        // Agregar botón "Finalizar Compra" al final del contenedor
        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Finalizar Compra';
        checkoutButton.classList.add('checkout-btn');
        checkoutButton.addEventListener('click', function() {
            // Limpiar el carrito (localStorage)
            localStorage.removeItem('cart');
            // Agradecer al usuario por su compra
            alert('¡Gracias por su compra!');
            // Redirigir a la página principal
            window.location.href = 'index.html';
        });

        cartContainer.appendChild(checkoutButton);
    }

    // Mostrar productos del carrito al cargar la página
    fetchCartProducts()
        .then(displayCartProducts)
        .catch(error => {
            console.log(error);
            cartContainer.innerHTML = '<p>Hubo un error al cargar el carrito.</p>';
        });
});
