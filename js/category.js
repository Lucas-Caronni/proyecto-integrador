document.addEventListener('DOMContentLoaded', function() {
    // Obtiene los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Mapear categorías con las secciones correspondientes en la página
    const categoryMapping = {
        "men's clothing": 'mens-clothing',
        "women's clothing": 'womens-clothing',
        electronics: 'electronics',
        jewelery: 'jewelery'
    };

    // Verifica si la categoría es válida
    if (!category || !categoryMapping[category]) {
        console.log('Categoría no válida o no especificada');
        return;
    }

    // Oculta todas las secciones primero
    for (let key in categoryMapping) {
        if (categoryMapping.hasOwnProperty(key)) {
            const section = document.getElementById(categoryMapping[key]);
            if (section) {
                section.style.display = 'none'; // Ocultar la sección
            }
        }
    }

    // Muestra la sección correspondiente a la categoría seleccionada
    const sectionId = categoryMapping[category];
    const section = document.getElementById(sectionId);
    
    // Verificar si la sección fue encontrada
    if (!section) {
        console.log(`No se encontró la sección con el ID: ${sectionId}`);
        return;
    }

    section.style.display = 'block'; // Mostrar la sección seleccionada
    const productsContainer = section.querySelector('.products');

    // Verificar si el contenedor de productos fue encontrado
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

    // Función para mostrar los productos en la página
    function displayProducts(products) {
        // Limpiar el contenedor de productos
        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No hay productos en esta categoría.</p>';
            return;
        }

        // Crear y agregar elementos para cada producto
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
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
        }
    }

    // Llamar a la función para obtener los productos de la categoría seleccionada
    fetchProductsByCategory(category);
});
