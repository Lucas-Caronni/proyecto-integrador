document.addEventListener('DOMContentLoaded', function() {
    // Definición de las categorías
    const categories = {
        electronics: 'electronics',
        jewelery: 'jewelery',
        "men's clothing": 'mens-clothing',
        "women's clothing": 'womens-clothing'
    };

    // Función para obtener productos de la API
    function fetchProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Función para mostrar productos en la página
    function displayProducts(products) {
        Object.keys(categories).forEach(category => {
            const section = document.getElementById(categories[category]);
            const productsContainer = section.querySelector('.products');
            const filteredProducts = products.filter(product => product.category === category);

            filteredProducts.forEach(product => {
                const productElement = document.createElement('article');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>Precio: $${product.price}</p>
                    <a href="producto.html?id=${product.id}" class="view-more-btn">Ver Más</a>
                `;
                productsContainer.appendChild(productElement);
            });
        });
    }

    // Llamada a la función para obtener y mostrar los productos
    fetchProducts();
});
