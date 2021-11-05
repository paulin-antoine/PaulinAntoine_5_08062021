
let resultTotal = 0;


// 1. Récupérer le contenu du panier dans localStorage
const productList = JSON.parse(window.localStorage.getItem("camera-basket"));
// 2. Récupérer les informations de chaque produit sur le serveur
function displayCart() {
    const recapLine2 = document.getElementById("basket-line-2");
    const bigTotal = document.getElementById("bigTotal");
    if (productList == null) {
        recapLine2.innerHTML = `
            <p id="noProduct">Le panier est vide !<p>
        `;
        bigTotal.innerHTML = `0.00€`

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
            <li>${cameraDecimalPrice} €</li>
            <li id="select${i}">${camera.select}</li>
            <li id="sum${i}">${cameraDecimalPrice * camera.quantity} €</li>
            <li onClick="deleteItem(${i})" class="icon-trash"><i class="far fa-trash-alt"></i>
              
        `
        i++;
        basketLine2.appendChild(productElement); 
        //addition de tout les prix pour le total du panier
       // let bigTotal = document.getElementById("#bigTotal");
        
        resultTotal += Number(cameraDecimalPrice * camera.quantity);
        

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
    
    //Incrémentation et décrémentation de la quantité dans le localstorage
    if (element.value > productList[val].quantity) {

        productList[val].quantity += 1;

        window.localStorage.setItem("camera-basket", JSON.stringify(productList));
        //Mise à jour du grand total    
        resultTotal += (productList[val].price)/1000;

        bigTotal.innerHTML = `${resultTotal.toFixed(2)} €`;
        
        
    }else if (element.value < productList[val].quantity){

        productList[val].quantity -= 1;

        window.localStorage.setItem("camera-basket", JSON.stringify(productList))
        //Mise à jour du grand total     
        resultTotal -= (productList[val].price)/1000;

        bigTotal.innerHTML = `${resultTotal.toFixed(2)} €`;
        
    }
    



}

function deleteItem (element){

    let productList2 = JSON.parse(window.localStorage.getItem("camera-basket"));
    let newbigTotal = document.getElementById("bigTotal");
    let sum = document.getElementById(`sum${element}`);
    if (productList2.length > 1){
        
        productList2.splice(element, element+1);
        let productList3 = JSON.stringify(productList2);
        window.localStorage.setItem("camera-basket", productList3);
        let clearLine = document.getElementById(`detailProduct-${element}`);
        const basketLine2 = document.getElementById("basket-line-2");
        basketLine2.removeChild(clearLine);
        let newSum = sum.textContent;
        let newSum2 = newSum.split('€');
        resultTotal = (Number(resultTotal).toFixed(2) - Number(newSum2[0]).toFixed(2)).toFixed(2);
        newbigTotal.innerHTML = `${resultTotal} €`;
    }else{

       window.localStorage.clear();
       const noProduct = document.getElementById("basket-line-2"); 
       noProduct.innerHTML = `<p id="noProduct">Le panier est vide !<p>`;
       newbigTotal.innerHTML = `0.00 €`;
    }
      
}


displayCart();

//Fonction pour envoyer les données du formulaire au back-end

let order = 0;
  
function sendToApi() {
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let adress = document.getElementById('adress').value;
    let postalCode = document.getElementById('postal-code').value;
    let mail = document.getElementById('input-mail').value;
    let city = document.getElementById('city').value;

    let regexFirstname = /^[A-Z][a-zA-Z]+$/.test(firstname);
    let regexLastname = /^[a-zA-Z '.-]*$/.test(lastname);
    let regexMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(mail);
    let regexAdress = /[0-9 ]{1,3}[a-zA-Z-' ]+[a-zA-Z-' ]+[a-zA-Z'-]+$/.test(adress);
    let regexCity = /[a-zA-Z-' ]+[a-zA-Z-' ]+[a-zA-Z'-]+$/.test(city);
    let regexPostalCode = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(postalCode);
    
    let product = [];

    try {
    for (camera of productList) {

        product.push(camera._id);
    }
    } catch (error) {
        console.error(error);
    }

    let user ={

        contact: {
            firstName: firstname,
            lastName: lastname,
            address: adress + ' ' + postalCode,
            city: city,
            email: mail
          },
          products: product, 
    
    } 

    if  (!firstname || !lastname || !adress || !postalCode || !mail || !city) {
            alert("Veuillez renseigner tout les champs");  
    }else if (regexFirstname == false || regexLastname == false || regexMail == false ||
              regexAdress == false || regexCity == false || regexPostalCode == false)
               {
                alert("Veuillez renseigner correctement les champs en rouge");
                              
    }else{
        
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      })
      .then((response) => response.json())
      .then((json) => { order = json.orderId;
        if (!window.localStorage.getItem("camera-basket")){
            alert("Votre panier est vide !");
        }else{
            addOrderIdInLocalStorage();    
            document.location.href="order.html";  
        }})
    }  
  }

function addOrderIdInLocalStorage () {
    let decimalTotal = (resultTotal).toFixed(2);
    window.localStorage.setItem("orderId", order);
    window.localStorage.setItem("price", decimalTotal);
    }

