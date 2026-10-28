//drop menu javascript logic
let is_dropped_menu_visible = false;
const phone_menu = document.getElementById('phone_menu');
const main_header_div = document.getElementById('main-header-div');
const add_to_cart_elements = document.querySelectorAll('#add-to-cart-elements > *:not([onclick])')
function drop_menu() {
    if (is_dropped_menu_visible == false) {
        phone_menu.classList.remove('hidden');
        phone_menu.classList.add('flex', 'flex-col', 'justify-center', 'items-center');
        main_header_div.classList.add('flex-col', 'items-center');
        let i = 0;
        while (i < add_to_cart_elements.length) {
            add_to_cart_elements[i].classList.add('hidden');
            add_to_cart_elements[i].classList.remove('inline-block');
            i++;
        }
        is_dropped_menu_visible = true;
    }
    else {
        phone_menu.classList.remove('flex', 'flex-col', 'justify-center', 'items-center');
        phone_menu.classList.add('hidden');
        main_header_div.classList.remove('flex-col', 'items-center');
        i = 0;
        while (i < add_to_cart_elements.length) {
            add_to_cart_elements[i].classList.remove('hidden');
            i++;
        }
        is_dropped_menu_visible = false;
    }
}


//Initial data of the app

// 1. Le tableau global (Catalogue complet incluant les accessoires)
const coffeeProducts = [
    { id: "c1", name: "Espresso Intense", category: "Base", price: 2.50, image: "espresso.jpg" },
    { id: "c2", name: "Cappuccino Mousseux", category: "Classique", price: 4.00, image: "cappuccino.jpg" },
    { id: "c3", name: "Latte Caramel", category: "Gourmand", price: 4.50, image: "latte.jpg" },
    { id: "c4", name: "Flat White", category: "Classique", price: 3.80, image: "flatwhite.jpg" },
    { id: "c5", name: "Iced Matcha Latte", category: "Froid", price: 5.00, image: "matcha.jpg" },
    { id: "c6", name: "Cold Brew", category: "Froid", price: 4.20, image: "coldbrew.jpg" },
    { id: "c7", name: "Cookie Pépites", category: "Snack", price: 2.00, image: "cookie.jpg" },
    { id: "c8", name: "Mug Isotherme Noir", category: "Accessoire", price: 15.00, image: "mug.jpg" },
    { id: "c9", name: "Filtres Papier V60 (x100)", category: "Accessoire", price: 6.50, image: "filters.jpg" },
    { id: "c10", name: "Tote Bag 'Coffee Lover'", category: "Accessoire", price: 12.00, image: "totebag.jpg" }
];

// 2. Le tableau des produits dans le panier par défaut (avec un accessoire)
let coffeeCart = [
    { id: "c2", name: "Cappuccino Mousseux", price: 4.00, quantity: 2, image: "cappuccino.jpg" },
    { id: "c3", name: "Licatte Caramel", price: 4.50, quantity: 1, image: "latte.jpg" },
    { id: "c8", name: "Mug Isotherme Noir", price: 15.00, quantity: 1, image: "mug.jpg" }
];


//Default coffee cart show in the dom
function default_values_cart() {
    let parent_element = document.getElementById('lignes-panier');
    parent_element.innerHTML = '';
    for (let key in coffeeCart) {
        let items_holder = coffeeCart[key];

        let name = document.createElement('span');
        name.textContent = items_holder.name;
        
        let quantity = document.createElement('span');
        quantity.textContent = items_holder.quantity;

        let price = document.createElement('span');
        price.textContent = items_holder.price;

        let retier = document.createElement('span');
        retier.textContent = 'Retier';

        parent_element.append(name,quantity,price, retier);
    }
}

default_values_cart();