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
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                displayProducts(data);
            })
            .catch(function(error) {
                console.log('Error fetching products:', error);
            })
    }

    // Función para mostrar productos de la api en la página 
    function displayProducts(products) {
        for (let category in categories) {
            if (categories.hasOwnProperty(category)) {
                const section = document.getElementById(categories[category]);
                const productsContainer = section.querySelector('.products');
                const filteredProducts = products.filter(function(product) {
                    return product.category === category;
                });

                for (let i = 0; i < filteredProducts.length; i++) {
                    const product = filteredProducts[i];
                    const productElement = document.createElement('article');
                    productElement.className = 'product';
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p>Price: $${product.price}</p>
                        <a href="producto.html?id=${product.id}" class="view-more-btn">Ver Más</a>
                    `;
                    productsContainer.appendChild(productElement);
                }
            }
        }
    }

    // línea del código que empieza todo el proceso de obtener y mostrar los productos.
    fetchProducts();
});
