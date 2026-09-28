/* ================= SELECT ELEMENTS ================= */

const navbar = document.querySelector("#navbar");

const searchPanel = document.querySelector("#search-panel");

const cartPanel = document.querySelector("#cart-panel");

const searchBox = document.querySelector("#search-box");

const cartItems = document.querySelector("#cart-items");

const cartTotal = document.querySelector("#cart-total");

const cartCount = document.querySelector("#cart-count");

const toast = document.querySelector("#toast");


/* ================= CART ================= */

let cart = [];


/* ================= MOBILE MENU ================= */

document
    .querySelector("#menu-btn")
    .addEventListener("click", () => {

        navbar.classList.toggle("active");

        searchPanel.classList.remove("active");

        cartPanel.classList.remove("active");

    });


/* ================= SEARCH BUTTON ================= */

document
    .querySelector("#search-btn")
    .addEventListener("click", () => {

        searchPanel.classList.toggle("active");

        cartPanel.classList.remove("active");

        navbar.classList.remove("active");

        if (searchPanel.classList.contains("active")) {

            searchBox.focus();

        }

    });


/* ================= CART BUTTON ================= */

document
    .querySelector("#cart-btn")
    .addEventListener("click", () => {

        cartPanel.classList.toggle("active");

        searchPanel.classList.remove("active");

        navbar.classList.remove("active");

    });


/* ================= CLOSE CART ================= */

document
    .querySelector("#close-cart")
    .addEventListener("click", () => {

        cartPanel.classList.remove("active");

    });


/* ================= NAVIGATION LINKS ================= */

document
    .querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

        });

    });


/* ================= FILTER MENU ================= */

document
    .querySelectorAll(".filter")
    .forEach(filterBtn => {

        filterBtn.addEventListener("click", () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn => {

                    btn.classList.remove("active");

                });


            filterBtn.classList.add("active");

            searchBox.value = "";


            const category =
                filterBtn.dataset.filter;


            let visible = 0;


            document
                .querySelectorAll(".menu-card")
                .forEach(card => {

                    const show =
                        category === "all" ||
                        card.dataset.category === category;


                    card.style.display =
                        show ? "" : "none";


                    if (show) {

                        visible++;

                    }

                });


            document
                .querySelector("#no-results")
                .style.display =
                visible ? "none" : "block";

        });

    });


/* ================= SEARCH ================= */

searchBox.addEventListener("input", () => {

    const query =
        searchBox.value
            .toLowerCase()
            .trim();


    let visible = 0;


    document
        .querySelectorAll(".menu-card")
        .forEach(card => {

            const text =
                card.dataset.name
                    .toLowerCase();


            const show =
                text.includes(query);


            card.style.display =
                show ? "" : "none";


            if (show) {

                visible++;

            }

        });


    document
        .querySelector("#no-results")
        .style.display =
        visible ? "none" : "block";

});


/* ================= ADD TO CART ================= */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;


            const price =
                Number(button.dataset.price);


            const existing =
                cart.find(
                    item => item.name === name
                );


            if (existing) {

                existing.qty++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    qty: 1

                });

            }


            renderCart();


            cartPanel.classList.add("active");


            showToast(
                `${name} added to your order`
            );

        });

    });


/* ================= CHANGE QUANTITY ================= */

function changeQty(index, amount) {

    cart[index].qty += amount;


    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }


    renderCart();

}


/* ================= REMOVE ITEM ================= */

function removeItem(index) {

    cart.splice(index, 1);

    renderCart();

}


/* ================= RENDER CART ================= */

function renderCart() {

    cartItems.innerHTML = "";


    if (!cart.length) {

        cartItems.innerHTML =
            '<div class="empty">Your order is empty.</div>';

    } else {

        cart.forEach((item, index) => {

            cartItems.innerHTML += `

                <div class="cart-row">

                    <span>
                        ${item.name}
                    </span>

                    <div class="qty">

                        <button
                            onclick="changeQty(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.qty}
                        </span>

                        <button
                            onclick="changeQty(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <span>
                        ₹${item.price * item.qty}
                    </span>

                    <button
                        class="remove"
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </button>

                </div>

            `;

        });

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.qty,
            0
        );


    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );


    cartTotal.textContent = total;

    cartCount.textContent = count;

}


/* ================= CHECKOUT ================= */

document
    .querySelector("#checkout-btn")
    .addEventListener("click", () => {

        if (!cart.length) {

            showToast(
                "Add something to your order first"
            );

            return;

        }


        showToast(
            "Demo checkout — order received ✓"
        );


        cart = [];


        renderCart();

    });


/* ================= CONTACT FORM ================= */

document
    .querySelector("#contact-form")
    .addEventListener("submit", function (e) {

        e.preventDefault();


        const name =
            document
                .querySelector("#contact-name")
                .value;


        showToast(
            `Thank you ${name}! Your message has been sent ✓`
        );


        this.reset();

    });


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent = message;


    toast.classList.add("show");


    clearTimeout(window.toastTimer);


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

}


/* ================= CLOSE PANELS ON SCROLL ================= */

window.addEventListener("scroll", () => {

    navbar.classList.remove("active");

    searchPanel.classList.remove("active");

    cartPanel.classList.remove("active");

});


/* ================= INITIAL CART ================= */

renderCart();