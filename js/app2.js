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
    { id: "c1", name: "Espresso Intense", category: "Base", price: 2.50, image: "/img/espresso.jpg" },
    { id: "c2", name: "Cappuccino Mousseux", category: "Classique", price: 4.00, image: "/img/cappuccino.jpg" },
    { id: "c3", name: "Latte Caramel", category: "Gourmand", price: 4.50, image: "/img/latte.jpg" },
    { id: "c4", name: "Flat White", category: "Classique", price: 3.80, image: "/img/flatwhite.jpg" },
    { id: "c5", name: "Iced Matcha Latte", category: "Froid", price: 5.00, image: "/img/matcha.jpg" },
    { id: "c6", name: "Cold Brew", category: "Froid", price: 4.20, image: "/img/coldbrew.jpg" },
    { id: "c7", name: "Cookie Pépites", category: "Snack", price: 2.00, image: "/img/cookie.jpg" },
    { id: "c8", name: "Mug Isotherme Noir", category: "Accessoire", price: 15.00, image: "/img/mug.jpg" },
    { id: "c9", name: "Filtres Papier V60 (x100)", category: "Accessoire", price: 6.50, image: "/img/filters.jpg" },
    { id: "c10", name: "Tote Bag 'Coffee Lover'", category: "Accessoire", price: 12.00, image: "/img/totebag.jpg" }
];

// 2. Le tableau des produits dans le panier par défaut (avec un accessoire)
let coffeeCart = [
    { id: "c2", name: "Cappuccino Mousseux", price: 4.00, quantity: 2, image: "/img/cappuccino.jpg" },
    { id: "c3", name: "Licatte Caramel", price: 4.50, quantity: 1, image: "/img/latte.jpg" },
    { id: "c8", name: "Mug Isotherme Noir", price: 15.00, quantity: 1, image: "/img/mug.jpg" }
];


//Default coffee cart show in the dom
function default_values_cart() {
    let total = 0;
    let parent_element = document.getElementById('lignes-panier');
    parent_element.innerHTML = '';
    for (let key in coffeeCart) {
        let items_holder = coffeeCart[key];

        let image = document.createElement('img');
        image.src = items_holder.image;
        image.alt = items_holder.name;
        image.classList = 'h-42 w-42 object-cover';

        let name = document.createElement('span');
        name.textContent = items_holder.name;

        let product = document.createElement('div');
        product.append(image, name);
        let quantity = document.createElement('span');
        quantity.textContent = items_holder.quantity;

        let price = document.createElement('span');
        price.textContent = (items_holder.price * items_holder.quantity).toFixed(2) + " DH";
        total += items_holder.price * items_holder.quantity;
        document.getElementById('panier-total').textContent = `${total.toFixed(2)} DH`;

        let choix = document.createElement('div');
        let add_button = document.createElement('button');
        add_button.type = 'button';
        add_button.textContent = '+'
        add_button.classList = 'w-8 h-8 bg-[#00AB66] rounded-full mx-2 text-white text-lg transition hover:bg-[#009157] duration-200 shadow cursor-pointer';

        let minus_button = document.createElement('button');
        minus_button.type = 'button';
        minus_button.textContent = '-'
        minus_button.classList = "w-8 h-8 bg-[#FF2C2C] rounded-full mx-2 text-white text-lg transition hover:bg-[#E01B1B] duration-200 shadow cursor-pointer";

        choix.append(add_button, minus_button);

        if (items_holder.can_be_deleted) {
            let remove_button = document.createElement('button');

            remove_button.type = 'button';
            remove_button.textContent = 'Supprimer';
            remove_button.className =
                'rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600';

            remove_button.addEventListener('click', function () {
                coffeeCart = coffeeCart.filter(function (item) {
                    return item.id !== items_holder.id;
                });

                default_values_cart();
                searchproduct();
            });

            choix.append(remove_button);
        }

        parent_element.append(product, quantity, price, choix);

        add_button.addEventListener('click', function () {
            if (items_holder.quantity < 7) {
                items_holder.quantity++;
                default_values_cart();
            }
        })

        minus_button.addEventListener('click', function () {
            if (items_holder.quantity > 1) {
                items_holder.quantity--;
                default_values_cart();
            }
        })
    }
}

default_values_cart();


let selected_products = "";
//searching for any partial match
function searchproduct() {
    let products_names = [];

    for (let product of coffeeProducts) {
        let already_in_cart = false;

        for (let cart_item of coffeeCart) {
            if (cart_item.id === product.id) {
                already_in_cart = true;
                break;
            }
        }

        if (already_in_cart == false) {
            products_names.push(product.name.toLowerCase());
        }
    }

    let input_field = document.getElementById('search_db');

    const does_value_exist = products_names.filter(function (names) {
        return names.includes(input_field.value.toLowerCase());
    })

    let parent_search = document.getElementById('parent_search_element');
    parent_search.innerHTML = "";

    for (let key of does_value_exist) {
        let option = document.createElement('button');
        option.type = 'button';
        option.textContent = key;
        option.className = `
        block w-full
        bg-[#E1E4E0]
        rounded-lg border border-[#CCD2CA]
        bg-white px-4 py-3 my-3
        text-left text-sm text-[#30291F]
        transition duration-200
        hover:bg-[#EDEFEB]
        hover:border-[#5E6A5A]
        focus:outline-none focus:ring-2 focus:ring-[#5E6A5A]
    `;


        option.addEventListener('click', function () {
            selected_products = key;

            // Find the complete product
            let product = coffeeProducts.find(function (item) {
                return item.name.toLowerCase() == selected_products;
            });

            // Add it to the cart
            coffeeCart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                can_be_deleted: true
            });

            // Refresh the page
            default_values_cart();
            searchproduct();
        });
        parent_search.append(option);
    }
}



//Testing valid function

function isvalid() {

    //Getting hidden paragraphs element ids to prepare them to show related errors
    let first_name_error = document.getElementById('nom-error')
    let last_name_error = document.getElementById('prenom-error')
    let address_value_error = document.getElementById('adresse-error')
    let email_value_error = document.getElementById('email-error')
    let card_number_error = document.getElementById('carte-numero-error')
    let card_date_error = document.getElementById('carte-expiration-error')
    let card_cvv_error = document.getElementById('cvv-error')


    //Getting the ids of the inputs elements to get data and validate it
    let first_name = document.getElementById('nom')
    let last_name = document.getElementById('prenom')
    let address_value = document.getElementById('adresse')
    let email_value = document.getElementById('email')
    let card_number = document.getElementById('carte-numero')
    let card_date = document.getElementById('carte-expiration')
    let card_cvv = document.getElementById('cvv')

    //Clearing Values
    first_name_error.textContent = "";
    first_name_error.hidden = true;

    last_name_error.textContent = "";
    last_name_error.hidden = true;

    address_value_error.textContent = "";
    address_value_error.hidden = true;

    email_value_error.textContent = "";
    email_value_error.hidden = true;

    card_number_error.textContent = "";
    card_number_error.hidden = true;

    card_date_error.textContent = "";
    card_date_error.hidden = true;

    card_cvv_error.textContent = "";
    card_cvv_error.hidden = true;

    //Regex patterns that are needed for this project
    const nameRegex = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;
    const addressRegex = /^[\p{L}\p{M}\d\s,،.'’/#-]{8,150}$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRegex = /^\d{13,19}$/;
    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;

    let isvalid = true
    if (first_name.value.trim() === "") {
        first_name_error.textContent = "La marque est obligatoire."
        first_name_error.hidden = false;
        isvalid = false;
    } else if (nameRegex.test(first_name.value.trim()) == false) {
        first_name_error.textContent = "Les données saisies ne sont pas dans un format valide."
        first_name_error.hidden = false;
        isvalid = false;
    }

    if (last_name.value.trim() === "") {
        last_name_error.textContent = "La marque est obligatoire."
        last_name_error.hidden = false;
        isvalid = false;
    } else if (nameRegex.test(last_name.value.trim()) == false) {
        last_name_error.textContent = "Les données saisies ne sont pas dans un format valide.";
        last_name_error.hidden = false;
        isvalid = false;
    }

    if (address_value.value.trim() === "") {
        address_value_error.textContent = "La marque est obligatoire."
        address_value_error.hidden = false;
        isvalid = false;
    } else if (addressRegex.test(address_value.value.trim()) == false) {
        address_value_error.textContent = "Les données saisies ne sont pas dans un format valide."
        address_value_error.hidden = false;
        isvalid = false;
    }

    if (email_value.value.trim() === "") {
        email_value_error.textContent = "La marque est obligatoire."
        email_value_error.hidden = false;
        isvalid = false;
    } else if (emailRegex.test(email_value.value.trim()) == false) {
        email_value_error.textContent = "Les données saisies ne sont pas dans un format valide."
        email_value_error.hidden = false;
        isvalid = false;
    }

    if (card_number.value.trim() === "") {
        card_number_error.textContent = "La marque est obligatoire."
        card_number_error.hidden = false;
        isvalid = false;
    } else if (cardRegex.test(card_number.value.trim()) == false) {
        card_number_error.textContent = "Les données saisies ne sont pas dans un format valide."
        card_number_error.hidden = false;
        isvalid = false;
    }

    if (card_date.value.trim() === "") {
        card_date_error.textContent = "La marque est obligatoire."
        card_date_error.hidden = false;
        isvalid = false;
    } else if (expirationRegex.test(card_date.value.trim()) == false) {
        card_date_error.textContent = "Les données saisies ne sont pas dans un format valide."
        card_date_error.hidden = false;
        isvalid = false;
    }

    if (card_cvv.value.trim() === "") {
        card_cvv_error.textContent = "La marque est obligatoire."
        card_cvv_error.hidden = false;
        isvalid = false;
    } else if (cvvRegex.test(card_cvv.value.trim()) == false) {
        card_cvv_error.textContent = "Les données saisies ne sont pas dans un format valide."
        card_cvv_error.hidden = false;
        isvalid = false;
    }
    return isvalid
}


//The form function

function validate_form() {
    document.getElementById('checkout-form').addEventListener('submit', function (event) {
        event.preventDefault();
        if (isvalid() == true) {
            alert("Your order has been submitted")
        }
    })
}
validate_form();

//calling the function when an input event happens
document.getElementById('search_db').addEventListener('input', searchproduct)

//A ready to use script for the imported component modal (hyperui)
const modalEl = document.querySelector('dialog')
const openButtonEl = document.querySelector('[data-modal-open]')

openButtonEl.addEventListener('click', () => modalEl.showModal())

document.querySelectorAll('[data-modal-close]').forEach((buttonEl) => {
    buttonEl.addEventListener('click', () => modalEl.close())
})