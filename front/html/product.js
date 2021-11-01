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

        document.querySelector("#addToCart").addEventListener('click', (e) => {
            e.preventDefault();

//DONNEES ENREGISTREES DANS LE LOCAL STORAGE

            let productOptions = {
            id: `${product._id}`,
            nom: `${product.name}`,
            couleur: document.querySelector("#colors").value,
            quantite: parseInt(document.querySelector("#quantity").value),
            prix: `${product.price}`,
            image: `${product.imageUrl}`,
            alt: `${product.altTxt}`
        }

//VARIABLE POUR ENREGISTRER LES CLES ET VALEURS DU LOCAL STORAGE

            let productInLocalStorage = JSON.parse(localStorage.getItem("Canape"));

            if (productInLocalStorage === null) {
                productInLocalStorage= [];
                productInLocalStorage.push(productOptions);
                localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));

            } else {
                const found = productInLocalStorage.find(element => element.id == productOptions.id && element.couleur == productOptions.couleur);
                
                
                if (found == undefined) {
                    productInLocalStorage.push(productOptions);
                    localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));
                    

        //SI PRODUIT AVEC MEME ID ET COULEUR AUGMENTER LA QUANTITE
                } else {

                    found.quantite += productOptions.quantite;
                    localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));

                }
            }   
        })
});

