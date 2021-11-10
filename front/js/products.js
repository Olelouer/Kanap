/*
REPRESENTATION DU FORMAT DES PRODUITS
*/

class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}