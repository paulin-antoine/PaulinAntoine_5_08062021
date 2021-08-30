

// 1. Récupérer le contenu du panier dans localStorage
const productInLocalStorage = JSON.parse(window.localStorage.getItem("camera-basket"));

// 2. Récupérer les informations de chaque produit sur le serveur
function displayCart() {
    const recapLine2 = document.getElementById("basket-line-2");

    if (productInLocalStorage == null) {
        recapLine2.innerHTML = `
            <p id="noProduct">Le panier est vide<p>
        `
    }

    else {
        productInLocalStorage.forEach(product => {
            fethProduct(product._id, product.quantite)
        });
    }
}

// 3. Afficher les informations des produits sur la page panier.html


// 4. Gérer le formulaire d'envoi des commandes et redirection sur la page de confirmation


    

/**
 * Fonction permettant de récupérer puis afficher les informations d'un produit
 * @param {int} id 
 */
function fethProduct(id, quantite) {
    fetch(url_produit + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json)
    .then(data => displayProduct(data, quantite))
    .catch(error => console.log({ error }));
}


