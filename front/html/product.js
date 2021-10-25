/*
AFFICHAGE DU PRODUIT SELECTIONNE
*/

//SELECTION DE L'ID DU PRODUIT DANS LA BARRE DE RECHERCHE
let params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;
console.log(urlProduct);


//AFFICHAGE DYNAMIQUE DU PRODUIT SELECTIONNE
fetch(urlProduct)
    .then( data => data.json())
    .then( jsonProduct => {
        let product = new Product(jsonProduct);
        document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}"" alt="${product.altTxt}">`;
        document.querySelector("#title").innerHTML +=  `${product.name}`;
        document.querySelector("#price").innerHTML += `${product.price}`;
        document.querySelector("#description").innerHTML += `${product.description}`;
        for (i = 0 ; i < product.colors.length ; i += 1) {
        document.querySelector("#colors").innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        }

//ENREGISTRER LES DONNEES DE SELECTION DE PRODUIT EN LOCAL
        document.querySelector("#addToCart").addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.setItem("Prix", `${product.price}`);
            localStorage.setItem("Id", `${product._id}`);
            let productColor = document.querySelector("#colors").value;
            localStorage.setItem("Couleur", productColor);
            let productQuantity = document.querySelector("#quantity").value;
            console.log(productQuantity);
            localStorage.setItem("Quantité", productQuantity);
        })
        console.dir(product);
});

//VARIABLE POUR ENREGISTRER LES CLES ET VALEURS DU LOCAL STORAGE
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

