let menus = [
    {
        name: "CLASSIC BURGER",
        ingredients: "100% Neuland Rindfleisch / Salat / Tomaten / eingelegte Gurken / rote Zwiebeln / hausgemachte Sauce / Ketchup",
        price: "8.90 €",

    },

    {
        name: "CHILI CHEESE BURGER",
        ingredients: "100% Neuland Rindfleisch / 2x Cheddar / gebratene Jalapenos / rote Zwiebeln / eingelegte Gurken / Heinz Mayonnaise",
        price: "9.90 €",

    },

    {
        name: "CHICKEN BURGER",
        ingredients: "Paniertes Chickenpatty / Cheddar / Salat / Tomaten / rote Zwiebeln / hausgemachte Sauce / Ketchup",
        price: "10.90 €",

    },

    {
        name: "THE SMASHED BURGER",
        ingredients: "Doppelt Smashed Rindfleisch / 3x Käse / gebratene Zwiebeln / Gurke / Tomaten / Smashed Spezial Burgersauce",
        price: "13.90 €",

    },

    {
        name: "DOUBLE CHILI CHEESE",
        ingredients: "Doppelt Rindfleisch / 3x Cheddar / gebratene Jalapeños / rote Zwiebeln / eingelegte Gurken / Mayonnaise / hausgemachte Sauce",
        price: "14.90 €",

    },

    {
        name: "DOUBLE CHEESE BURGER",
        ingredients: "Doppelt Rindfleisch / Salat / Tomaten / eingelegte Gurken / rote Zwiebeln /  3x Cheddar / hausgemachte Sauce",
        price: "15.90 €",

    },
];


let names = [];
let prices = [];
let amounts = [];

function init() {
    load();
    render();
    updateCart();
}

function render() {
    let menu = document.getElementById("menuCard");
    menu.innerHTML = "";
    for (let i = 0; i < menus.length; i++) {
        let selectMenu = menus[i];
        menu.innerHTML += createHTML(selectMenu, i);
    }
}

function addToBasket(name, price) {
    let basketElement = names.indexOf(name);
    if (basketElement == -1) {
        names.push(name);
        prices.push(price);
        amounts.push(1);
    } else {
        amounts[basketElement]++;
    }
    updateCart();
    save();
}

function updateCart() {
    let cartContent = document.getElementById("cartContent");
    if (names.length === 0) {
        cartContent.innerHTML = `
            <i class="fa-solid fa-bag-shopping"></i>
            <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>`;
    } else {
        cartContent.innerHTML = "";
        for (let i = 0; i < names.length; i++) {
            cartContent.innerHTML += createCartContent(i)
        }
    }
    updateSubtotal();
}

function changeQuantity(index, amount) {
    amounts[index] += amount;
    if (amounts[index] === 0) {
        names.splice(index, 1);
        prices.splice(index, 1);
        amounts.splice(index, 1);
    }
    updateCart();
    save();
}

function updateSubtotal() {
    let subtotalElement = document.getElementById("priceOfSubtotal");
    let subtotal = 0; //
    for (let i = 0; i < prices.length; i++) {
        subtotal += parseFloat(prices[i]) * amounts[i];
    }
    subtotalElement.innerText = `${subtotal.toFixed(2)} €`;
    updateTotal();
}

function updateTotal() {
    let subtotalElement = document.getElementById("priceOfSubtotal");
    let deliveryElement = document.getElementById("deliveryCosts");
    let totalElement = document.getElementById("total");
    let subtotal = parseFloat(subtotalElement.innerText.replace('€', '').trim());
    let deliveryPrice = parseFloat(deliveryElement.innerText.replace('€', '').trim());
    let sum = subtotal + deliveryPrice;
    if (names.length === 0) {
        sum = 0;
    }
    totalElement.innerText = `${sum.toFixed(2)} €`;
}

function save() {
    let nameData = JSON.stringify(names);
    let priceData = JSON.stringify(prices);
    let amountData = JSON.stringify(amounts);
    localStorage.setItem("names", nameData);
    localStorage.setItem("prices", priceData);
    localStorage.setItem("amounts", amountData);
}

function load() {
    let nameData = localStorage.getItem("names");
    let priceData = localStorage.getItem("prices");
    let amountData = localStorage.getItem("amounts");
    if (nameData && priceData && amountData) {
        names = JSON.parse(nameData);
        prices = JSON.parse(priceData);
        amounts = JSON.parse(amountData);
    }
}

function closeOrder() {
    names = [];
    prices = [];
    amounts = [];
    updateCart();
    save();
}

function openPopup() {
    let popupElement = document.getElementById("mobileCart");
    popupElement.classList.add("openPopup");
    init();
}

function closePopup() {
    let popupElement = document.getElementById("mobileCart");
    popupElement.classList.remove("openPopup");
}

//HTML FUNCTIONS

function createHTML(selectMenu) {
    return `
                <div class="menuAdded">
                    <div class="addToMenu"><i" onclick="addToBasket('${selectMenu.name}', '${selectMenu.price}', 1)" class="fa-solid fa-plus blueplus"></i></div>
                    <div class="name">${selectMenu["name"]}</div>
                    <div class="ingredients">${selectMenu["ingredients"]}</div>
                    <div class="price">${selectMenu["price"]}</div>
                </div>
  `;
}

function createCartContent(i) {
    return `
                <div class="cartItem">
                    <span class="itemAmount">${amounts[i]}x</span>
                    <span class="itemName">${names[i]}</span>
                    <span class="itemPrice">${prices[i]}</span>
                    <button class="minusButton" onclick="changeQuantity(${i}, -1)">-</button>
                    <button onclick="changeQuantity(${i}, 1)">+</button>
                </div>
            `;
}

