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

//Getting all the wanted elements id to manuplate

// Getting divs
let step_1 = document.getElementById('step-1');
let step_2 = document.getElementById('step_2');
let step_3 = document.getElementById('step-3');

// Getting elements of the steper
let stepper_element_1 = document.getElementById('step-ind-1');
let stepper_element_2 = document.getElementById('step-ind-2');
let stepper_element_3 = document.getElementById('step-ind-3');

// Getting buttons ids
let prev_btn = document.getElementById('prev-btn');
let next_btn = document.getElementById('next-btn');
let submit_btn = document.getElementById('submit-btn');


//Declaring a variable to hold the state on the current page
let current_step = 1;

//A function to update the page visually for depnding on the state of the declared variable
function update_wizard_buttons() {
    let i = 1;
    while (i <= 3) {
        document.getElementById('step-' + i).classList.add('hidden');
        i++;
    }
    document.getElementById('step-' + current_step).classList.remove('hidden');

    if (current_step === 1) {
        prev_btn.classList.add('hidden');
    }
    else {
        prev_btn.classList.remove('hidden');
    }
    if (current_step >= 2) {
        document.getElementById('step-ind-2').classList.add('step-primary');
    } else {
        document.getElementById('step-ind-2').classList.remove('step-primary');
    }

    if (current_step === 3) {
        document.getElementById('step-ind-3').classList.add('step-primary');
        submit_btn.classList.remove('hidden');
        next_btn.classList.add('hidden')
    } else {
        document.getElementById('step-ind-3').classList.remove('step-primary');
        next_btn.classList.remove('hidden');
        submit_btn.classList.add('hidden')
    }
}
update_wizard_buttons();

//Validating inputs before moving to the next step
function validate_steps() {
    function error_message(message) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 3000
        });
    }

    if (current_step === 1) {
        let name_regex = /^[a-zA-ZÀ-ÿ\s'-]{3,40}$/;
        let price_regex = /^\d+(\.\d{1,2})?$/;
        let url_regex = /^https?:\/\/.+\..+/;
        let desc_regex = /^[\s\S]{10,300}$/;

        let drink_name_element = document.getElementById('drink-name').value.toLowerCase();
        let drink_price_element = document.getElementById('drink-price').value.toLowerCase();
        let drink_desc_element = document.getElementById('drink-desc').value.toLowerCase();
        let drink_img_element = document.getElementById('drink-img').value.toLowerCase();

        let promo_percent_element = document.getElementById('promo-percent').value;
        let promo_date_element = document.getElementById('promo-date').value;

        if (name_regex.test(drink_name_element) === false || drink_name_element == "") {
            error_message("Nom de boisson invalide (3 lettres minimum) !");
            return false;
        }
        if (price_regex.test(drink_price_element) === false || Number(drink_price_element) <= 0) {
            error_message("Veuillez saisir un prix valide (supérieur à 0 !) !");
            return false;
        }
        if (url_regex.test(drink_img_element) === false || drink_img_element == "") {
            error_message("L'URL de l'image doit commencer par http:// ou https:// !");
            return false;
        }
        if (desc_regex.test(drink_desc_element) === false || drink_desc_element == "") {
            error_message("La description doit contenir au moins 10 caractères !");
            return false;
        }
        if (document.getElementById('promo-toggle').checked === true) {
            let current_date = new Date();
            current_date.setHours(0,0,0,0);
            let choosen_date = new Date(promo_date_element);
            if (promo_percent_element == "" || Number(promo_percent_element) < 0 || Number(promo_percent_element) > 90) {
                error_message("Veuillez choisir parmi une gamme de remises allant de 0 % à 90 % !");
                return false;
            }
            if (promo_date_element === "") {
                error_message("Veuillez choisir une date valide");
                return false;
            }
            else if(choosen_date < current_date) {
                error_message("La date de fin doit être aujourd'hui ou dans le futur !");
                return false;
            }
        }

    }
    if (current_step === 2) {
        let origin_element = document.getElementById('coffee-origin').value;
        let temp_checked = document.querySelector('input[name="temperature"]:checked');
        let sizes_checked = document.querySelectorAll('input[name="sizes"]:checked');

        if (origin_element === "") {
            error_message("Veuillez choisir un pays d'origine valide!");
            return false;
        }
        if (temp_checked === null) {
            error_message("Veuillez choisir si la boisson sera froide ou chaude!")
            return false;
        }
        if (sizes_checked.length === 0) {
            error_message("Veuillez choisir au moins une taille de boisson !")
            return false;
        }
    }

    return true;
}



next_btn.addEventListener('click', function () {
    if (validate_steps() === true) {
        current_step++;
        update_wizard_buttons();
    }
})

prev_btn.addEventListener('click', function () {
    current_step--;
    update_wizard_buttons();
})

let promo_button = document.getElementById('promo-toggle');
promo_button.addEventListener('click', function () {
    if (promo_button.checked == true) {
        document.getElementById('promo-fields').classList.remove('hidden');
    }
    else {
        document.getElementById('promo-fields').classList.add('hidden');
    }
})