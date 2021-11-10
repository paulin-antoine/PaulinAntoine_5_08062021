const productElement = document.getElementById("product");
let params = new URL(document.location).searchParams;
const cameraId = params.get("id");
//1.Affiche la camera séléctionnée dans la page acceuil.
function renderProduct(camera) {
  let productItem = document.createElement("div");
  productItem.innerHTML = `
    <img src="${camera.imageUrl}"> 
    <div id="description">
    <div id="name">${camera.name}</div>
    <p>${camera.description}<p>
    </div>
    
  `;
  productElement.appendChild(productItem);
}

//2.Récupere la camera correspondante à l'identifiant dans l'URL. 
fetch(`http://localhost:3000/api/cameras/${cameraId}`)
  .then((response) => response.json())
  .then((camera) => {
    renderProduct(camera);
    const basketButton = document.getElementById("basketButton");
    basketButton.addEventListener("click", () => {
      addCameraToBasket(camera);
    });
    lenseChoice(camera);
    priceItem(camera);
  });
//3.Ajoute l'objet "camera" dans le localStorage.
function addCameraToBasket(cameraObject) {
  if (!window.localStorage.getItem("camera-basket")) {
    const cameraList = [cameraObject];
    //4.Ajout de la clé "quantity" pour chaque item dans le localStorage
    cameraObject["quantity"] = 1;
    const cameraListJson = JSON.stringify(cameraList);
    window.localStorage.setItem("camera-basket", cameraListJson);
  } else {
    let cameraListJson = window.localStorage.getItem("camera-basket");
    const cameraList = JSON.parse(cameraListJson);
    let isAlreadyInStorage = false;
    for (camera of cameraList) {
      if (camera["_id"] == cameraObject["_id"]) {
        isAlreadyInStorage = true;
        camera["quantity"] += 1;
      }
    }
    if (isAlreadyInStorage == false) {
      cameraObject["quantity"] = 1;
      cameraList.push(cameraObject);
    }
    cameraListJson = JSON.stringify(cameraList);
    window.localStorage.setItem("camera-basket", cameraListJson);
  }

  const alertAddProduct = document.getElementById("alert");
  alertAddProduct.innerHTML = `
      <p>Votre article a été ajouté au panier !</p>
    `;
}
//5.Choix de la lentille (non retenu dans le LocalStorage).
function lenseChoice(cameraLense) {
  const lenses = document.getElementById("option");
  lenses.innerHTML = `
  <form id="choice">
    <span>Option :</span>
    <input type="radio" class="lense" name="lense" value="lense-1">
    <label for="lense-1">${cameraLense.lenses[0]}</label>
    <input type="radio" class="lense" name="lense" value="lense-2">
    <label for="lense-2">${cameraLense.lenses[1]}</label>
  </form>
  `;
}
//6.Affiche le prix avec les bonnes décimales.
function priceItem(cameraPrice) {
  const price1 = document.getElementById("price");
  const cameraPrice1 = parseFloat(cameraPrice.price) / 100;
  const cameraPriceDecimal = cameraPrice1.toFixed(2);
  price1.innerHTML = `
    <p>Prix: ${cameraPriceDecimal} €</p>

  `;
}
