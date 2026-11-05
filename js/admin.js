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

// Getting buttons ids
let prev_btn = document.getElementById('prev-btn');
let next_btn = document.getElementById('next-btn');
let submit_btn = document.getElementById('submit-btn');


//Declaring a variable to hold the state on the current page
let current_step = 1;

//Declaring a variable to hold the form data
const final_step_data_holder = {};

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
            current_date.setHours(0, 0, 0, 0);
            let choosen_date = new Date(promo_date_element);
            if (promo_percent_element == "" || Number(promo_percent_element) < 0 || Number(promo_percent_element) > 90) {
                error_message("Veuillez choisir parmi une gamme de remises allant de 0 % à 90 % !");
                return false;
            }
            if (promo_date_element === "") {
                error_message("Veuillez choisir une date valide");
                return false;
            }
            else if (choosen_date < current_date) {
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

    return true;;
}

function final_review() {
    if (validate_steps() == "false") {
        return;
    }

    final_step_data_holder.name = document.getElementById('drink-name').value.toLowerCase();
    final_step_data_holder.price = document.getElementById('drink-price').value.toLowerCase();
    final_step_data_holder.image = document.getElementById('drink-img').value;
    final_step_data_holder.descr = document.getElementById('drink-desc').value.toLowerCase();
    final_step_data_holder.on_discount = document.getElementById('promo-toggle').checked;
    final_step_data_holder.discount_rate = document.getElementById('promo-percent').value;
    final_step_data_holder.discount_date = document.getElementById('promo-date').value;
    final_step_data_holder.origine = document.getElementById('coffee-origin').value;
    final_step_data_holder.intensity = document.getElementById('coffee-intensity').value;
    final_step_data_holder.temps = document.querySelector('input[name="temperature"]:checked').value;

    //Inserting an array in the value of the key related to element values
    let sizes_values = document.querySelectorAll('input[name="sizes"]:checked')
    let sizes_box = [];
    let i = 0
    while (i < sizes_values.length) {
        sizes_box.push(sizes_values[i].value);
        i++;
    }
    final_step_data_holder.sizes = sizes_box;

    let milks_box = [];
    let milks_elements = document.querySelectorAll('input[name="milks"]:checked');
    i = 0;
    while (i < milks_elements.length) {
        milks_box.push(milks_elements[i].value);
        i++;
    }
    if (milks_box.length === 0) {
        milks_box.push("Aucune");
    }

    final_step_data_holder.type_of_milk = milks_box;

    let extras_box = [];
    let extras_elements = document.querySelectorAll('input[name="extras"]:checked');
    i = 0;
    while (i < extras_elements.length) {
        extras_box.push(extras_elements[i].value);
        i++;
    }
    if (extras_box.length === 0) {
        extras_box.push("Aucune");
    }
    final_step_data_holder.extras = extras_box;

    document.getElementById('summary-container').innerHTML = `
        <div class="card bg-base-200 p-6 rounded-xl space-y-6 shadow-md">
            <img src="${final_step_data_holder.image}" class="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 class="text-2xl font-bold">${final_step_data_holder.name} - ${final_step_data_holder.price} DH</h3>
            <p>${final_step_data_holder.descr}</p>
            <hr class="my-2">
            <p><strong>Origine :</strong> ${final_step_data_holder.origine}</p>
            <p><strong>Intensité :</strong> ${final_step_data_holder.intensity} / 10</p>
            <p><strong>Température :</strong> ${final_step_data_holder.temps}</p>
            <p><strong>Tailles :</strong> ${final_step_data_holder.sizes}</p>
            <p><strong>Laits :</strong> ${final_step_data_holder.type_of_milk}</p>
            <p><strong>Suppléments :</strong> ${final_step_data_holder.extras}</p>
            <p><strong>Réduction (%) :</strong> ${final_step_data_holder.discount_rate || "Aucune"}</p>
            <p><strong>Fin de promo :</strong> ${final_step_data_holder.discount_date || "Aucune"}</p>
        </div>
    `;
    localStorage.setItem("Product_info", JSON.stringify(final_step_data_holder));
}

next_btn.addEventListener('click', function () {
    if (validate_steps() === true) {
        current_step++;
        update_wizard_buttons();
    }
    if (current_step > 2) {
        final_review();
        console.log(final_step_data_holder);
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

document.getElementById('product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    Swal.fire({
        title: "Félicitations",
        text: "Produit ajouté au catalogue avec succès !",
        icon: "success"
    });

    // 2. Vider tous les champs du formulaire et cacher la promo
    document.getElementById('product-form').reset();
    document.getElementById('promo-fields').classList.add('hidden');

    // 3. Revenir à l'étape 1
    current_step = 1;
    update_wizard_buttons();
});