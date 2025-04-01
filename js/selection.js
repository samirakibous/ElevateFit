function filterProducts(selectedCategory) {
    const products = document.querySelectorAll(".produit");

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category').trim();
        if (selectedCategory === "" || productCategory === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none"; 
        }
    });
}

function filterByPrice(maxPrice) {
    const products = document.querySelectorAll(".produit"); 
    const priceValueDisplay = document.getElementById("priceValue"); // Sélectionne l'élément avec l'ID "priceValue" pour afficher le prix max actuel
    priceValueDisplay.textContent = maxPrice; // Affiche la valeur de maxPrice dans l'élément "priceValue"

    products.forEach(product => {
        const productPrice = parseInt(product.getAttribute("data-price")); 
        // Récupère le prix depuis l'attribut "data-price" et le convertit en nombre
        
        if (productPrice <= maxPrice) {
            product.style.display = "block"; 
        } else {
            product.style.display = "none"; 
        }
    });
}


const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = (value/2) + "%";
  slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});


// Détails du produit
function productDetails(event) {
    const clickedProduct = event.currentTarget; 

    const productImage = clickedProduct.getElementsByTagName('img')[0]; 
    const productTitle = clickedProduct.getElementsByTagName('h4')[0]; 
    const productPrice = clickedProduct.getAttribute('data-price'); 

    if (productImage) {
        const imageSrc = productImage.src; 
        localStorage.setItem('productImageSrc', imageSrc);
    }
    if (productTitle) {
        localStorage.setItem('productTitle', productTitle.innerText);
    }
    if (productPrice) {
        localStorage.setItem('productPrice', productPrice);
    }

    // Redirection vers la page des détails
    window.location.href = "product-detail.html"; 
}
