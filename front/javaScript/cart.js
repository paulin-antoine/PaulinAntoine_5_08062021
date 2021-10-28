
let resultTotal = 0;


// 1. Récupérer le contenu du panier dans localStorage
const productList = JSON.parse(window.localStorage.getItem("camera-basket"));
// 2. Récupérer les informations de chaque produit sur le serveur
function displayCart() {
    const recapLine2 = document.getElementById("basket-line-2");

    if (productList == null) {
        recapLine2.innerHTML = `
            <p id="noProduct">Le panier est vide !<p>
        `
    }

    else {
       displayProductList(productList);
    }
}

// 3. Afficher les informations des produits sur la page panier.html
function displayProductList(products) {

    const basketLine2 = document.getElementById("basket-line-2");
    basketLine2.innerHTML = `<ul id="basket-line-1">
                                <li>Nom</li>
                                <li>Prix</li>
                                <li>Quantité</li>
                                <li>Total</li>
                                <li></li>
                            `
    let i = 0;
    
    for (camera of products) {

        //Construire le select en utilisant camera.quantity (camera.quantity correspond à l'option du select selectionné)
       // camera["select"] = `<select onChange="change(this)"id="${i}">
                          //  <option value="1">1</option>
                         //   <option value="2">2</option>
                         //   <option value="3">3</option>
                         //   </select>`;
        camera["select"] = `<select onChange="change(this)"id="${i}">`

        for (let j = 0; j < 10; j++) {
            if (j+1 == camera.quantity) {
                camera["select"] += `<option selected value="${j+1}">${j+1}</option>`
            } else {
                camera["select"] += `<option value="${j+1}">${j+1}</option>`
            }
        }
        camera["select"] += `</select>`

        camera["select"] = `<input onChange="change(this)"id="${i}"
                            type="number" min="1" max="10" value="${camera.quantity}"> `

        
        let cameraEntirePrice = camera.price/1000;
        let cameraDecimalPrice = cameraEntirePrice.toFixed(2);
        const productElement = document.createElement("ul");
        productElement.setAttribute("id",`detailProduct-${i}`)
        productElement.innerHTML = `
            
            <li>${camera.name}</li>
            <li>${cameraDecimalPrice}</li>
            <li id="select${i}">${camera.select}</li>
            <li>${cameraDecimalPrice * camera.quantity}</li>
            <li onClick="deleteItem(${i})" class="icon-trash"><i class="far fa-trash-alt"></i>
              
        `
        i++;
        basketLine2.appendChild(productElement); 
        //addition de tout les prix pour le total du panier
       // let bigTotal = document.getElementById("#bigTotal");
        
        resultTotal += Number(cameraDecimalPrice * camera.quantity);
        console.log(resultTotal)

        let bigTotal = document.getElementById("bigTotal");

        bigTotal.innerHTML = ` <div id="total-price">${resultTotal.toFixed(2)} €</div>`;
        
    }


}
//Récuperation de l'id du selecteur de quantité
function change(element){
    
    val = Number(element.id);
    let totalPrice = document.getElementById(`detailProduct-${val}`).children[3];
   
    let newPrice = (productList[val].price * Number(element.value))/1000;
    totalPrice.innerHTML = `${newPrice}`
    

   /* if (element.value == 2){ //A la place du if je dois mettre à jour la quantity de la camera 
        //correspondante dans localStorage.
        let option2 = document.getElementById(`option2${val}`);
        option2.setAttribute("selected","")
        console.log(option2);
        
         
    }*/ 
    
    //Incrémentation et décrémentation de la quantité dans le localstorage
    if (element.value > productList[val].quantity) {

        productList[val].quantity += 1;

        window.localStorage.setItem("camera-basket", JSON.stringify(productList));
        //Mise à jour du grand total    
        resultTotal += (productList[val].price)/1000;

        bigTotal.innerHTML = `${resultTotal.toFixed(2)}`;
         
        
    }else if (element.value < productList[val].quantity){

        productList[val].quantity -= 1;

        window.localStorage.setItem("camera-basket", JSON.stringify(productList))
        //Mise à jour du grand total     
        resultTotal -= (productList[val].price)/1000;

        bigTotal.innerHTML = `${resultTotal.toFixed(2)}`;
        
    }
    



}

function deleteItem (element){

    let productList2 = JSON.parse(window.localStorage.getItem("camera-basket"));

    if (productList2.length > 1){
        
        productList2.splice(element, element+1);
        let productList3 = JSON.stringify(productList2);
        window.localStorage.setItem("camera-basket", productList3);
        let clearLine = document.getElementById(`detailProduct-${element}`);
        const basketLine2 = document.getElementById("basket-line-2");
        basketLine2.removeChild(clearLine);
        
    }else{

       window.localStorage.clear();
       const noProduct = document.getElementById("basket-line-2"); 
       noProduct.innerHTML = `<p id="noProduct">Le panier est vide !<p>`  

    }
    
   
}


displayCart();


// 4. Gérer le formulaire d'envoi des commandes et redirection sur la page de confirmation




