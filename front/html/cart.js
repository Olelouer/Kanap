let productInLocalStorage = JSON.parse(localStorage.getItem("Canapé"));

//AFFICHAGE DES PRODUITS DU PANIER

//GESTION DU PANIER VIDE ET PLEIN
if (productInLocalStorage == null) {
    document.querySelector("#cart__items").innerHTML += `<div id="empty_cart">
                                                            <p>Panier est vide</p>
                                                        </div>`;

} else {
    for (i = 0 ; i < productInLocalStorage.length ; i+= 1) {
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
        let sum = 0;                                                       
        document.querySelector("#totalQuantity").innerHTML += `${sum += productInLocalStorage[i].quantité}`;    
        document.querySelector("#totalPrice").innerHTML += `${sum += productInLocalStorage[i].prix * productInLocalStorage[i].quantité}`;
        
    }
}