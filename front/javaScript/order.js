//1.Affichage du message de remerciement avec le prix et l'identifiant de la commande.
const price = document.getElementById("price");
const id = document.getElementById("id");
const priceInLocalStorage = window.localStorage.getItem("price");
const orderId = window.localStorage.getItem("orderId");

price.innerHTML = `${priceInLocalStorage}`;
id.innerHTML = `${orderId}`;
