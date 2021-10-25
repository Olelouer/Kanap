/*
AFFICHAGE DE LA PAGE D'ACCUEIL ET SES INTERACTIONS
*/

const urlProducts = `http://localhost:3000/api/products`;

fetch(urlProducts)
    .then( data => data.json())
    .then( jsonProducts => {
        for (let jsonProduct of jsonProducts) {
        let product = new Product(jsonProduct);
        document.querySelector(".items").innerHTML += `<a href="./product.html?id=${product._id}">          
                                                                <article>
                                                                    <img src="${product.imageUrl}"" alt="${product.altTxt}">
                                                                    <h3 class="productName">${product.name}</h3>
                                                                    <p class="productDescription">${product.description}</p>
                                                                </article>
                                                            </a>`;
    }
});
