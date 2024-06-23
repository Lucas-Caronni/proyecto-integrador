document.addEventListener('DOMContentLoaded', function() {
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
                console.log(error);
            });
    }

    // Función para mostrar productos de la API en la página
    function displayProducts(products) {
        for (let category in categories) {
            if (categories.hasOwnProperty(category)) {
                const section = document.getElementById(categories[category]);
                const productsContainer = section.querySelector('.products');
                const filteredProducts = products.filter(function(product) {
                    return product.category === category;
                });
                productsContainer.innerHTML = '';
                let productsHTML = '';

                for (let i = 0; i < filteredProducts.length; i++) {
                    const product = filteredProducts[i];
                    const productHTML = `
                        <article class="product">
                            <img src="${product.image}" alt="${product.title}">
                            <h3>${product.title}</h3>
                            <p>${product.description}</p>
                            <p>Price: $${product.price}</p>
                            <a href="producto.html?id=${product.id}" class="view-more-btn">Ver Más</a>
                        </article>
                    `;
                    productsHTML += productHTML; 
                }
                productsContainer.innerHTML = productsHTML;
            }
        }
    }
    fetchProducts();
});