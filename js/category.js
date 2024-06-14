document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');

    if (category) {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then(products => {
                const productsContainer = document.querySelector('.products-list');

                products.forEach(product => {
                    const productArticle = document.createElement('article');
                    productArticle.classList.add('product');

                    productArticle.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p>Price: $${product.price}</p>
                        <a href="product-detail.html?id=${product.id}" class="view-more-btn">View More</a>
                    `;

                    productsContainer.appendChild(productArticle);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }
});
