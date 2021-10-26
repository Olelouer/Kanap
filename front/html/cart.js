//AFFICHAGE DES PRODUITS DU PANIER

let productInLocalStorage = JSON.parse(localStorage.getItem("Canapé"));

//GESTION DU PANIER VIDE ET PLEIN

if (productInLocalStorage == null) {
    document.querySelector("#cart__items").innerHTML += `<div id="empty_cart">
                                                            <p>Panier est vide</p>
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
                                                                                <p>${productInLocalStorage[i].prix * productInLocalStorage[i].quantité} €</p>
                                                                            </div>
                                                                            <div class="cart__item__content__settings">
                                                                                <div class="cart__item__content__settings__quantity">
                                                                                    <p>Couleur : ${productInLocalStorage[i].couleur}</p>
                                                                                    <p>Qté : ${productInLocalStorage[i].quantité}</p>
                                                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantité}">
                                                                                </div>
                                                                                <div class="cart__item__content__settings__delete">
                                                                                    <p class="deleteItem">Supprimer</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </article>
                                                                </article>`;

//TOTAL PANIER

    //VARIABLES POUR CHANGER LE TYPE EN NOMBRE

        let quantityNumber = parseInt(productInLocalStorage[i].quantité);
        let priceNumber = parseInt(productInLocalStorage[i].prix * productInLocalStorage[i].quantité);

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


