function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category') || 'all'
    };
}
async function loadProducts() {
    const { category } = getQueryParams();
    const productsContainer = document.getElementById('category-products');

    const apiUrl = category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;

    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No hay productos en esta categoría.</p>';
            return;
        }

        products.forEach(product => {
            const productElement = document.createElement('article');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <a href="product.html?id=${product.id}" class="view-more-btn">Ver Más</a>
            `;

            productsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<p>Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>';
    }
}

window.onload = loadProducts;
