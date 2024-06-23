document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    const categoryMapping = {
        "men's clothing": 'mens-clothing',
        "women's clothing": 'womens-clothing',
        electronics: 'electronics',
        jewelery: 'jewelery'
    };

    // Verificar si la categoría es válida
    if (!category || !categoryMapping[category]) {
        console.log('Categoría no válida o no especificada');
        return;
    }

    // Ocultar todas las secciones primero
    for (let key in categoryMapping) {
        if (categoryMapping.hasOwnProperty(key)) {
            const section = document.getElementById(categoryMapping[key]);
            if (section) {
                section.style.display = 'none'; 
            }
        }
    }
    const sectionId = categoryMapping[category];
    const section = document.getElementById(sectionId);

    // Verificar si la sección fue encontrada
    if (!section) {
        console.log(`No se encontró la sección con el ID: ${sectionId}`);
        return;
    }

    section.style.display = 'block';
    const productsContainer = section.querySelector('.products');

    
    if (!productsContainer) {
        console.log(`No se encontró el contenedor de productos en la sección con el ID: ${sectionId}`);
        return;
    }

    // Función para obtener productos de la API por categoría
    function fetchProductsByCategory(category) {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(products) {
                displayProducts(products);
            })
            .catch(function(error) {
                console.log('Error al obtener productos:', error);
            });
    }

    function displayProducts(products) {
        // Limpiar el contenedor de productos
        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No hay productos en esta categoría.</p>';
            return;
        }

        let productsHTML = ''; 

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productHTML = `
                <article class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>Precio: $${product.price}</p>
                    <a href="producto.html?id=${product.id}" class="view-more-btn">Ver Más</a>
                </article>
            `;
            productsHTML += productHTML; 
        }
        productsContainer.innerHTML = productsHTML;
    }

    fetchProductsByCategory(category);
});