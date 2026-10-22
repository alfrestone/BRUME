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

//Base data of the project

const config = {
    base: {
        espresso: { name: "Espresso", price: 18 },
        filtre: { name: "Filtre", price: 16 }
    },
    taille: {
        s: { name: "S · 150 ml", price: 0 },
        m: { name: "M · 250 ml", price: 4 },
        l: { name: "L · 350 ml", price: 8 }
    },
    lait: {
        vache: { name: "Lait de vache", price: 0 },
        avoine: { name: "Lait d'avoine", price: 4 },
        amande: { name: "Lait d'amande", price: 5 }
    },
    supplements: {
        caramel: { name: "Caramel", price: 3 },
        vanille: { name: "Vanille", price: 3 }
    }
};

//Filling empty elements dynamically
function afficherOption(cle, option) {
    document.getElementById(cle + "-name").textContent =
        option.name;
    document.getElementById(cle + "-price").textContent =
        option.price.toFixed(2) + " DH";
}


//Helper function to show all the elements automatically with looping and not hardcoding
for (let key1 in config) {
    let collect_group = config[key1];
    for (let key2 in collect_group) {
        let options = collect_group[key2];
        afficherOption(key2, options);
    }
}
//empty hold storage for calc total and holding live data

let selectedConfig = {
    base: null,
    taille: null,
    lait: null,
    caramel: null,
    vanille: null
};

// calculating function
function calculerTotal() {
    let total = 0;

    for (const option of Object.values(selectedConfig)) {
        if (option !== null) {
            total = total + option.price;
        }
    }

    document.getElementById("total-price").textContent =
        total.toFixed(2) + " DH";

    return total;
}


//selecting function to highlight one button and disable the rest
function setSelected(btn, isSelected) {
    if (isSelected) {
        btn.classList.remove('border-[#DFD5C8]');
        btn.classList.add('border-[#394B32]', 'bg-[#E9EEDC]');
    } else {
        btn.classList.remove('border-[#394B32]', 'bg-[#E9EEDC]');
        btn.classList.add('border-[#DFD5C8]');
    }
}


function chooseOneOption(group, key) {
    selectedConfig[group] = config[group][key];
    calculerTotal();
    for (let key2 in config[group]) {
        setSelected(document.getElementById("btn-" + key2), key2 === key);
    }

}

// function choisirEspresso() {
//     selectedConfig.base = config.base.espresso;
//     calculerTotal();

//     setSelected(document.getElementById("btn-espresso"), true);
//     setSelected(document.getElementById("btn-filtre"), false);
// }

// function choisirFiltre() {
//     selectedConfig.base = config.base.filtre;
//     calculerTotal();

//     setSelected(document.getElementById("btn-filtre"), true);
//     setSelected(document.getElementById("btn-espresso"), false);
// }

// function choisirS() {
//     selectedConfig.taille = config.taille.s;
//     calculerTotal();

//     setSelected(document.getElementById("btn-s"), true);
//     setSelected(document.getElementById("btn-m"), false);
//     setSelected(document.getElementById("btn-l"), false);
// }

// function choisirM() {
//     selectedConfig.taille = config.taille.m;
//     calculerTotal();

//     setSelected(document.getElementById("btn-m"), true);
//     setSelected(document.getElementById("btn-s"), false);
//     setSelected(document.getElementById("btn-l"), false);
// }

// function choisirL() {
//     selectedConfig.taille = config.taille.l;
//     calculerTotal();

//     setSelected(document.getElementById("btn-l"), true);
//     setSelected(document.getElementById("btn-s"), false);
//     setSelected(document.getElementById("btn-m"), false);
// }

// function choisirVache() {
//     selectedConfig.lait = config.lait.vache;
//     calculerTotal();

//     setSelected(document.getElementById("btn-vache"), true);
//     setSelected(document.getElementById("btn-avoine"), false);
//     setSelected(document.getElementById("btn-amande"), false);
// }

// function choisirAvoine() {
//     selectedConfig.lait = config.lait.avoine;
//     calculerTotal();

//     setSelected(document.getElementById("btn-avoine"), true);
//     setSelected(document.getElementById("btn-vache"), false);
//     setSelected(document.getElementById("btn-amande"), false);
// }

// function choisirAmande() {
//     selectedConfig.lait = config.lait.amande;
//     calculerTotal();

//     setSelected(document.getElementById("btn-amande"), true);
//     setSelected(document.getElementById("btn-vache"), false);
//     setSelected(document.getElementById("btn-avoine"), false);
// }


function chooseSupplement(key) {
    if (selectedConfig[key] === null) {
        selectedConfig[key] = config.supplements[key];
        setSelected(document.getElementById("btn-" + key), true);
    } else {
        selectedConfig[key] = null;
        setSelected(document.getElementById("btn-" + key), false);
    }
    calculerTotal();
}

document.getElementById("btn-espresso").addEventListener("click", function () { chooseOneOption("base", "espresso"); });
document.getElementById("btn-filtre").addEventListener("click", function () { chooseOneOption("base", "filtre"); });
document.getElementById("btn-s").addEventListener("click", function () { chooseOneOption("taille", "s"); });
document.getElementById("btn-m").addEventListener("click", function () { chooseOneOption("taille", "m"); });
document.getElementById("btn-l").addEventListener("click", function () { chooseOneOption("taille", "l"); });
document.getElementById("btn-vache").addEventListener("click", function () { chooseOneOption("lait", "vache"); });
document.getElementById("btn-avoine").addEventListener("click", function () { chooseOneOption("lait", "avoine"); });
document.getElementById("btn-amande").addEventListener("click", function () { chooseOneOption("lait", "amande"); });
document.getElementById("btn-caramel").addEventListener("click", function () {chooseSupplement("caramel");});
document.getElementById("btn-vanille").addEventListener("click", function () {chooseSupplement("vanille");});



function remplirRecu() {
    const lignes = document.getElementById("lignes-recu");
    lignes.replaceChildren();

    for (const option of Object.values(selectedConfig)) {
        if (option !== null) {
            const ligne = document.createElement("p");
            ligne.textContent = option.name + " : " + option.price.toFixed(2) + " DH";
            lignes.appendChild(ligne);
        }
    }

    document.getElementById("recu-total").textContent = calculerTotal().toFixed(2) + " DH";
}

function afficherRecu() {
    if (selectedConfig.base === null || selectedConfig.taille === null || selectedConfig.lait === null) {
        alert("Choisissez une base, une taille et un lait.");
        return;
    }

    remplirRecu();
    document.getElementById("configurateur").hidden = true;
    document.getElementById("recu").hidden = false;
}

function modifierConfiguration() {
    document.getElementById("recu").hidden = true;
    document.getElementById("configurateur").hidden = false;
}

document.getElementById("btn-valider").addEventListener("click", afficherRecu);
document.getElementById("btn-modifier").addEventListener("click", modifierConfiguration);