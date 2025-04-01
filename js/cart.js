function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price, image) {
    let cart = getCart();
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart(cart); 
    alert("Produit ajouté au panier !");
}
function displayCart() {
    let cart = getCart();
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }

    cart.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <p>${product.name}</p>
                        <small>price: $${product.price}</small><br>
                        <a href="#" onclick="removeFromCart(${product.id})">Remove</a>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${product.quantity}" onchange="updateQuantity(${product.id}, this.value)"></td>
            <td class="subtotal">$${(product.price * product.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    updateTotal();
}

function updateQuantity(id, newQuantity) {
    let cart = getCart();
    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = parseInt(newQuantity);
        saveCart(cart);
        displayCart();
    }
}

function updateTotal() {
    let cart = getCart();
    let total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    let tax = total * 0.2;
    let totalWithTax = total + tax;

    document.querySelector('.Totale').textContent = total.toFixed(2);
    document.querySelector('.Tva').textContent = tax.toFixed(2);
    document.querySelector('.totaleWithTva').textContent = totalWithTax.toFixed(2);
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let id = this.dataset.id;
        let name = this.dataset.name;
        let price = parseFloat(this.dataset.price);
        let image = this.dataset.image;

        addToCart(id, name, price, image);
    });
});


function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    displayCart();
}
document.addEventListener("DOMContentLoaded", displayCart);
