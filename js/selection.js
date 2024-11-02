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
// Ajouter des écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes("product-detail.html")) {
        const storedImageSrc = localStorage.getItem('productImageSrc');
        const productTitle = localStorage.getItem('productTitle');
        const productPrice = localStorage.getItem('productPrice');

        const imageDetailed = document.getElementById('product-img');
        const titleDetailed = document.getElementById('detailed_prodect_title');
        const priceDetailed = document.getElementById('detailed_prodect_price');

        if (imageDetailed && storedImageSrc) {
            imageDetailed.src = storedImageSrc;
            console.log('Image mise à jour :', storedImageSrc);
        }
        if (titleDetailed) {
            titleDetailed.innerText = productTitle; 
            console.log('Titre mis à jour :', productTitle);
        }
        if (priceDetailed) {
            priceDetailed.innerText = `$${productPrice}`; 
            console.log('Prix mis à jour :', productPrice);
        }
    }
});

// function getAllLocalStorageItems() {
//     const items=[];
//     for(let i=0;localStorage.length;i++){
//         const key=localStorage.key(i);
//         const value=localStorage.getItem(key);
//         items.push({key,value});
//     }
//     return items;
// }
// let productCounter = 1;
// function addToCart(event,id){
//     const clickedButton =event.currentTarget;
//     const clickedProduct = clickedButton.closest('.produit');// Trouve la div parent avec la classe "produit"
//     const productImage = clickedProduct.getElementsByTagName("img")[0].src;
//     const productTitle =clickedProduct.getElementsByTagName("h4")[0].textContent;
//     const productPrice=clickedProduct.getAttribute('data-price'); 
     
//     const localStorageItems= getAllLocalStorageItems();
//     let found=false;
//     for(let i=0 ;i<localStorageItems.length ;i++){
//         const localStorageItem=localStorageItems[i];
//         if(localStorageItem.key.includes("productInCart")){
//             const existingProduct=JSON.parse(localStorageItem.value);
//             if(existingProduct.ProductId==id){
//                 existingProduct.ProductQuantity++;
//                 localStorage.setItem(localStorageItem.key,JSON.stringify(existingProduct));
//                 found=true;
//                 break; // Exit the loop if product is found and updated
//             }
//         }
//     }

//     // If product was not found in the cart, add it as a new entry
//     if (!found) {
//         const productToSave = {
//             productId:id,
//             productImage: productImage,
//             productTitle: productTitle,
//             productPrice: productPrice,
//             productQuantity: 1,
//         };
//         // Save the product as a JSON string in localStorage
//         const newProductKey = 'productInCart' + productCounter;
//         localStorage.setItem(newProductKey, JSON.stringify(productToSave));
//         console.log('New product added:', newProductKey);


//         // Increment cart item count
//         productCounter++;
//         console.log(productCounter);
//     }
//     // Redirect to the cart page
//     window.location.href = "cart.html"; 
// }

// // adding to cart page
// window.onload = function() {
//     // Check if the current URL contains "product-detail.html"
//     if (window.location.href.includes("cart.html")) {
//         alert("hi")
//         const localStorageItems=getAllLocalStorageItems();
//         const cartProducts=localStorageItems.filter(function(product){
//             return product.key.includes("productInCart");
//         })
//         console.log(cartProducts);
//     }
// }