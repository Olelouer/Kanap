//AFFICHAGE DES PRODUITS DU PANIER

let productInLocalStorage = JSON.parse(localStorage.getItem("Canape"));

//GESTION DU PANIER VIDE ET PLEIN

if (productInLocalStorage == null || productInLocalStorage.length == 0 ) {
    document.querySelector("#cart__items").innerHTML += `<div id="empty_cart">
                                                            <p>Panier vide</p>
                                                        </div>`;

} else {

    //CREATION DES VARIABLES TABLEAUX QUI VONT CONTENIR LES QUANTITES ET PRIX DES PRODUITS

    let totalPrice = [];
    let totalQuantity = [];

    //EXTRACTION DU LOCAL STORAGE POUR CREATION DE LA FICHE PRODUIT DANS LE PANIER

    for (i = 0 ; i < productInLocalStorage.length ; i += 1) {
        document.querySelector("#cart__items").innerHTML +=     `<article class="cart__item" data-id="${productInLocalStorage[i].id}">
                                                                     <article class="cart__item" data-id="${productInLocalStorage[i].id}">
                                                                        <div class="cart__item__img">
                                                                            <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
                                                                        </div>
                                                                        <div class="cart__item__content">
                                                                            <div class="cart__item__content__titlePrice">
                                                                                <h2>${productInLocalStorage[i].nom}</h2>
                                                                                <p>${productInLocalStorage[i].prix * productInLocalStorage[i].quantite} €</p>
                                                                            </div>
                                                                            <div class="cart__item__content__settings">
                                                                                <div class="cart__item__content__settings__quantity">
                                                                                    <p>Couleur : ${productInLocalStorage[i].couleur}</p>
                                                                                    <p>Qté : </p>
                                                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${productInLocalStorage[i].id}" canapeColor="${productInLocalStorage[i].couleur}" value="${productInLocalStorage[i].quantite}">
                                                                                </div>
                                                                                <div class="cart__item__content__settings__delete">
                                                                                    <p class="deleteItem" canapeId="${productInLocalStorage[i].id}" canapeColor="${productInLocalStorage[i].couleur}">Supprimer</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </article>
                                                                </article>`;

//TOTAL PANIER

    //VARIABLES POUR CHANGER LE TYPE EN NOMBRE

        let quantityNumber = parseInt(productInLocalStorage[i].quantite);
        let priceNumber = parseInt(productInLocalStorage[i].prix * productInLocalStorage[i].quantite);

    //PUSH DES NOMBRES DANS LES VARIABLES TABLEAUX

        totalQuantity.push(quantityNumber);
        totalPrice.push(priceNumber);

    }

    //ADDITION DES QUANTITES DES PRODUITS

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalQuantityResult = totalQuantity.reduce(reducer, 0);

    //ADDITION DES PRIX DES PRODUITS

    const totalPriceResult = totalPrice.reduce(reducer, 0);

    document.querySelector("#totalQuantity").innerHTML += `${totalQuantityResult}`;
    document.querySelector("#totalPrice").innerHTML += `${totalPriceResult}`;

}

//GERER LES INTERACTIONS AVEC LE FORMULAIRE A REMPLIR

//PATTERN POUR VALIDATION DE LETTRES UNIQUEMENT
let patternFirstName = document.querySelector("#firstName");
patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternLastName = document.querySelector("#lastName");
patternLastName.setAttribute("pattern", "[a-zA-Z-éèà]*");

let patternCity = document.querySelector("#city");
patternCity.setAttribute("pattern", "[a-zA-Z-éèà]*");

//RECUPERER LES ID POUR ENVOIE A L'API

let getId = productInLocalStorage.map(product => product.id);

console.log(getId);

//VALIDATION DES CHAMPS UTILISATEURS ET ENVOI DES DONNEES A L'API

document.querySelector(".cart__order__form__submit").addEventListener("click", function(e) {
    e.preventDefault();
    let valid = true;
    for(let input of document.querySelectorAll(".cart__order__form__question input")) {
    valid &= input.reportValidity();
        if (!valid) {
            break;
        } 
    }   
    if (valid) {
        const result = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("email").value
                    },
                products : getId
            })
        });

        result.then(async (response) => {
            try {
                const data = await response.json();
                console.log(data);
            } catch (e) {
            }
        });
    }
})

  //MODIFICATION DE LA QUANTITE AVEC L'INPUT

  let inputs = document.querySelectorAll('.itemQuantity');

  for (let input of Array.from(inputs)) {
      input.addEventListener("change", event => {
        let canapeId = event.target.getAttribute("canapeId");
        let canapeColor = event.target.getAttribute("canapeColor");
        const modify = productInLocalStorage.find(element => element.id == canapeId && element.couleur == canapeColor);
        modify.quantite = input.value;
        productInlocalStorage = modify;
        localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));
        window.location.href = "cart.html";
    })
  }

//SELECTION DES ELEMENTS A GARDER ET SUPPRESSION DE L'ELEMENT

  let buttons = document.querySelectorAll('.deleteItem');

  for (let button of Array.from(buttons)){
      button.addEventListener("click", e => {
          let canapeId = e.target.getAttribute("canapeId");
          let canapeColor = e.target.getAttribute("canapeColor");
          const deleteItem = productInLocalStorage.find(element => element.id == canapeId && element.couleur == canapeColor);
          productInLocalStorage = productInLocalStorage.filter(item => item != deleteItem);
          localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));
          window.location.href = "cart.html";
      })
  }


