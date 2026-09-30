document.addEventListener("DOMContentLoaded", function () {


    /*  HERO IMAGE CHANGE  */

    const heroCake =
        document.getElementById("heroCake");

    const heroImages = [
        "/static/images/hero3.jpg",
        "/static/images/hero1.jpg",
        "/static/images/hero2.jpg"
    ];

    let heroIndex = 0;

    function changeHeroImage() {

        if (!heroCake) {
            return;
        }

        heroCake.style.opacity = "0";

        setTimeout(function () {

            heroIndex++;

            if (heroIndex >= heroImages.length) {
                heroIndex = 0;
            }

            heroCake.src =
                heroImages[heroIndex];

            heroCake.style.opacity = "1";

        }, 250);
    }


    /*  EXPLORE BUTTON  */

    const exploreButton =
        document.getElementById("exploreBtn");

    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function () {

                changeHeroImage();

            }
        );

    }


    /* = GET SAME CART  */

    let cart =
        JSON.parse(
            localStorage.getItem(
                "crustCrumbsCart"
            )
        ) || [];


    /*  CART COUNT  */

    const cartCountElement =
        document.getElementById("cartCount");

    function updateCartCount() {

        if (!cartCountElement) {
            return;
        }

        cartCountElement.innerText =
            cart.length;

    }


    /*  PRICE DROPDOWN  */

    const priceButtons =
        document.querySelectorAll(
            ".price-toggle"
        );

    priceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const priceBox =
                    button.nextElementSibling;

                if (!priceBox) {
                    return;
                }

                priceBox.classList.toggle(
                    "show"
                );

                if (
                    priceBox.classList.contains(
                        "show"
                    )
                ) {

                    button.innerText =
                        "Hide Prices ▲";

                } else {

                    button.innerText =
                        "View Prices ▼";

                }

            }
        );

    });


    /*  FILTER BUTTONS  */

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedFlavour =
                    button.getAttribute(
                        "data-filter"
                    );

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                filterCakes(
                    selectedFlavour
                );

            }
        );

    });


    /*  VIEW CAKES */

    const viewButtons =
        document.querySelectorAll(
            ".view-cakes"
        );

    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedFlavour =
                    button.getAttribute(
                        "data-flavour"
                    );

                const cakesUrl =
                    button.getAttribute(
                        "data-url"
                    );

                if (!cakesUrl) {
                    return;
                }

               

                localStorage.setItem(
                    "selectedFlavour",
                    selectedFlavour
                );

                

                window.location.href =
                    cakesUrl;

            }
        );

    });


    /*  SEARCH  */

    const searchButton =
        document.getElementById(
            "searchBtn"
        );

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                const searchText =
                    prompt(
                        "Search for a cake:"
                    );

                if (!searchText) {
                    return;
                }

                const cards =
                    document.querySelectorAll(
                        ".cake-card"
                    );

                let found = false;

                cards.forEach(function (card) {

                    const nameElement =
                        card.querySelector(
                            "h3"
                        );

                    if (!nameElement) {
                        return;
                    }

                    const cakeName =
                        nameElement.innerText
                            .toLowerCase();

                    if (
                        cakeName.includes(
                            searchText.toLowerCase()
                        )
                    ) {

                        card.style.display =
                            "";

                        found = true;

                    } else {

                        card.style.display =
                            "none";

                    }

                });

                const collection =
                    document.getElementById(
                        "cakeCollection"
                    );

                if (collection) {

                    collection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                if (!found) {

                    alert(
                        "Sorry, no cake found."
                    );

                }

            }
        );

    }


    /*  BOOK CAKE */

    window.bookCake =
        function (
            cakeName,
            flavour,
            cakeId
        ) {

            const selectedSize =
                document.querySelector(
                    'input[name="kg_' +
                    cakeId +
                    '"]:checked'
                );

            if (!selectedSize) {

                alert(
                    "Please select a cake size first."
                );

                return;

            }

            const kg =
                selectedSize.value;

            const price =
                selectedSize.getAttribute(
                    "data-price"
                );


            const cake = {

                name: cakeName,

                flavour: flavour,

                kg: kg,

                price: price

            };


            cart.push(cake);


            localStorage.setItem(
                "crustCrumbsCart",
                JSON.stringify(cart)
            );


            updateCartCount();


            alert(
                cakeName +
                " (" +
                kg +
                " KG) has been added to your cart."
            );

        };


    /*  CART OPEN  */

    const cartButton =
        document.getElementById(
            "cartBtn"
        );

    const cartPanel =
        document.getElementById(
            "cartPanel"
        );

    const closeCart =
        document.getElementById(
            "closeCart"
        );


    if (
        cartButton &&
        cartPanel
    ) {

        cartButton.addEventListener(
            "click",
            function () {

                renderCart();

                cartPanel.classList.add(
                    "show"
                );

            }
        );

    }


    /*CART CLOSE  */

    if (
        closeCart &&
        cartPanel
    ) {

        closeCart.addEventListener(
            "click",
            function () {

                cartPanel.classList.remove(
                    "show"
                );

            }
        );

    }


    /*  CLICK OUTSIDE CART  */

    if (cartPanel) {

        cartPanel.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    cartPanel
                ) {

                    cartPanel.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /*  RENDER CART  */

    function renderCart() {

        const cartItems =
            document.getElementById(
                "cartItems"
            );

        if (!cartItems) {
            return;
        }

        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML =
                "<p>Your cart is empty.</p>";

            return;

        }


        cart.forEach(
            function (item, index) {

                const cartItem =
                    document.createElement(
                        "div"
                    );

                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        <small>
                            ${item.flavour || ""}
                        </small>

                        <br>

                        <small>
                            ${item.kg || ""} KG
                        </small>

                        <br>

                        <strong>
                            ₹${item.price || ""}
                        </strong>

                    </div>


                    <button
                        class="remove-cart-item"
                        data-index="${index}"
                    >

                        Remove

                    </button>

                `;


                cartItems.appendChild(
                    cartItem
                );

            }
        );


        /*  REMOVE ITEM  */

        const removeButtons =
            document.querySelectorAll(
                ".remove-cart-item"
            );


        removeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.getAttribute(
                                    "data-index"
                                )
                            );


                        cart.splice(
                            index,
                            1
                        );


                        localStorage.setItem(
                            "crustCrumbsCart",
                            JSON.stringify(cart)
                        );


                        updateCartCount();

                        renderCart();

                    }
                );

            }
        );

    }


    /*  PLACE ORDER */

    const submitOrder =
        document.getElementById(
            "submitOrder"
        );


    if (submitOrder) {

        submitOrder.addEventListener(
            "click",
            function () {


                if (cart.length === 0) {

                    alert(
                        "Please add a cake to your cart first."
                    );

                    return;

                }


                const name =
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value
                        .trim();


                const address =
                    document
                        .getElementById(
                            "customerAddress"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "customerPhone"
                        )
                        .value
                        .trim();


                if (
                    name === "" ||
                    address === "" ||
                    phone === ""
                ) {

                    alert(
                        "Please enter Name, Address and Phone Number."
                    );

                    return;

                }


                alert(
                    "Thank you " +
                    name +
                    "! Your order has been received."
                );


                cart = [];


                localStorage.setItem(
                    "crustCrumbsCart",
                    JSON.stringify(cart)
                );


                updateCartCount();

                renderCart();


                document
                    .getElementById(
                        "customerName"
                    )
                    .value = "";


                document
                    .getElementById(
                        "customerAddress"
                    )
                    .value = "";


                document
                    .getElementById(
                        "customerPhone"
                    )
                    .value = "";

            }
        );

    }


    /*  CAKE PAGE SELECTED FLAVOUR  */

    const selectedFlavour =
        localStorage.getItem(
            "selectedFlavour"
        );


    const cakeCollection =
        document.getElementById(
            "cakeCollection"
        );


    if (
        selectedFlavour &&
        cakeCollection
    ) {

        filterCakes(
            selectedFlavour
        );


        const cakeFilterButtons =
            document.querySelectorAll(
                ".filter-button"
            );


        cakeFilterButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );


                const filterName =
                    button.getAttribute(
                        "data-filter"
                    );


                if (
                    filterName &&
                    filterName.toLowerCase() ===
                    selectedFlavour.toLowerCase()
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );


        localStorage.removeItem(
            "selectedFlavour"
        );

    }


    /*  INITIAL CART COUNT  */

    updateCartCount();

});


/*  CAKE FILTER FUNCTION  */

function filterCakes(selectedFlavour) {

    const cards = document.querySelectorAll(".cake-card");

    cards.forEach(function (card) {

        const cardFlavour = card.getAttribute("data-flavour");

        if (!cardFlavour) {
            card.style.display = "none";
            return;
        }

        const cleanCardFlavour = cardFlavour.trim().toLowerCase().replace(/\s+/g, '');
        const cleanSelectedFlavour = selectedFlavour.trim().toLowerCase().replace(/\s+/g, '');

        if (
            cleanSelectedFlavour === "all" ||
            cleanCardFlavour === cleanSelectedFlavour
        ) {

            card.style.display = ""; 

        } else {

            card.style.display = "none"; 

        }

    });

}

