// Shopping cart window 

let cart = [];

const cartCounter = document.getElementById("cart-counter");
const cartButtons = document.querySelectorAll(".add-to-cart");

const cartWindow = document.getElementById("cart-popup");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartMessage = document.getElementById("cart-message");

const cartSubtotal = document.getElementById("cart-subtotal");
const continuebutton = document.getElementById("continue-shopping");

// Open shopping cart window
function openCartWindow() {
    cartWindow.style.display = "flex";

    cartWindow.setAttribute("aria-hidden", "false");

    setTimeout(function() {
        cartWindow.classList.add("active");
    }, 10);
}

// Close shopping cart window
function closeCartWindow() {
    cartWindow.classList.remove("active");

    cartWindow.setAttribute("aria-hidden", "true");

    setTimeout(function() {
        cartWindow.style.display = "none";
    }, 400);
}

// Display produxts in cart window
function displayCart() {
    cartItems.textContent = "";

    let subtotal = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Cart is empty.";
    }

    cart.forEach(function(product, index) {
        const item = document.createElement("div");
        item.className = "cart-item";

        // Details of products
        const productImage = document.createElement("img")
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.className = "cart-product-image";

        const productDetails = document.createElement("div");
        productDetails.className = "cart-product-details";

        const productName = document.createElement("span");
        productName.textContent = product.name;

        const productPrice = document.createElement("span");
        productPrice.textContent = product.price;

        productDetails.appendChild(productName);
        productDetails.appendChild(productPrice);

        // Quantity of products recorder
        const quantityRecorder = document.createElement("div");
        quantityRecorder.className = "quantity-recorder";

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.type = "button";
        decreaseButton.className = "quantity-button";
        decreaseButton.dataset.action = "decrease";
        decreaseButton.dataset.index = index;


        const quantity = document.createElement("span");
        quantity.textContent = product.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.type = "button";
        increaseButton.className = "quantity-button";
        increaseButton.dataset.action = "increase";
        increaseButton.dataset.index = index;

        quantityRecorder.appendChild(decreaseButton);
        quantityRecorder.appendChild(quantity);
        quantityRecorder.appendChild(increaseButton);

        // Remove button section
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.dataset.action = "remove";
        removeButton.dataset.index = index;

        item.appendChild(productImage);
        item.appendChild(productDetails);
        item.appendChild(quantityRecorder);
        item.appendChild(removeButton);
        
        cartItems.appendChild(item);

        // Calculate totals
        const price = Number(product.price.replace(/[^\d.]/g, ""));
        subtotal += price * product.quantity;
        totalQuantity += product.quantity;
    });

    // Update cart counter and subtotal
    cartCounter.textContent = totalQuantity;

    cartSubtotal.textContent = subtotal.toLocaleString("en-ZA", {
        style: "currency",
        currency: "ZAR"
    });
}

// Products added to cart
cartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const productFigure = button.closest("figure");
        const productDetails = productFigure.querySelectorAll("figcaption");
        const productName = productDetails[0].textContent;
        const productPrice = productDetails[1].textContent;

        const productImage = productFigure.querySelector("img").src;

        const existingProduct = cart.find(function(product) {
            return product.name === productName;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        button.textContent = "Added";

        cartMessage.textContent = "Product has been added";
        displayCart();
        openCartWindow();
    });
});

// Quantity handler and remove button clicks
cartItems.addEventListener("click", function(event) {
    const button = event.target;
    const action = button.dataset.action;
    const index = Number(button.dataset.index);

    if (!action || !cart[index]) {
        return;
    }

    if (action === "increase") {
        cart[index].quantity++;
        cartMessage.textContent = "Product quantity increased"
    }

    else if (action === "decrease") {
        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            removeProduct(index);
            return;
        }

        cartMessage.textContent = "Product quantity decreased"
    }

    else if (action === "remove") {
        removeProduct(index);
        return;
    }

    displayCart();
});

// Individaul product remover
function removeProduct(index) {
    const productName = cart[index].name;
    cart.splice(index, 1);

    // Resets products 'Add to Cart' button
    cartButtons.forEach(function(button) {
        const productFigure = button.closest("figure");
        const productDetails = productFigure.querySelectorAll("figcaption");

        if (productDetails[0].textContent === productName) {
            button.textContent = "Add to cart";
        }
    });

    cartMessage.textContent = "Product has been removed";
    displayCart();
}

closeCart.addEventListener("click", function() {
    closeCartWindow();
})

continuebutton.addEventListener("click", function() {
    closeCartWindow();
});

// Product category filter
const productFilter = document.getElementById("product-filter");
const categoryHeadings = document.querySelectorAll("main > h3");

productFilter.addEventListener("change", function() {
    const selectedCategory = productFilter.value;

    categoryHeadings.forEach(function(heading) {
        const productSection = heading.nextElementSibling;

        if (selectedCategory === "all" || heading.textContent.trim() === selectedCategory) {
            heading.style.display = "block"
            productSection.style.display = "flex";
        } else {
            heading.style.display = "none";
            productSection.style.display = "none";
        }
    });
});



