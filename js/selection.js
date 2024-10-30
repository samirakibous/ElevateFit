function filterProducts(selectedCategory) {
    const products = document.querySelectorAll(".col-4");

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category').trim();
        if (selectedCategory === "" || productCategory === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none"; 
        }
    });
}

