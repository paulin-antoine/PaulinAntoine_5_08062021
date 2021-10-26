const productElement = document.getElementById("product");
let params = new URL(document.location).searchParams; 
const cameraId = params.get("id");


function renderProduct(camera) { 
  
  let productItem = document.createElement('div');
  productItem.innerHTML = `
    <img src="${camera.imageUrl}"> 
    <div id="description">
    <div id="name">${camera.name}</div>
    <p>${camera.description}<p>
    </div>
    
  `
  productElement.appendChild(productItem);
}

fetch(`http://localhost:3000/api/cameras/${cameraId}`)
.then(response => response.json())
.then(camera => {
  renderProduct(camera)
  const basketButton = document.getElementById("basketButton");
  basketButton.addEventListener("click", () => {
    addCameraToBasket(camera);});
  lenseChoice(camera);
  priceItem(camera);
});



function addCameraToBasket(cameraObject) {

  if (!window.localStorage.getItem("camera-basket") ){
    const cameraList = [cameraObject];
    //Ajout de la clé "quantity" pour chaque item dans le localStorage
    cameraObject["quantity"] = 1;
    const cameraListJson = JSON.stringify(cameraList);
    window.localStorage.setItem("camera-basket", cameraListJson);
    
  }else{
    let cameraListJson = window.localStorage.getItem("camera-basket");
    const cameraList = JSON.parse(cameraListJson);
    let isAlreadyInStorage = false;
    for (camera of cameraList){

      if (camera["_id"]  == cameraObject["_id"]){

        isAlreadyInStorage = true;
        camera["quantity"] += 1;
      }
    }
    if (isAlreadyInStorage == false){
    cameraObject["quantity"] = 1;
    cameraList.push(cameraObject);
    }
    cameraListJson = JSON.stringify(cameraList);
    window.localStorage.setItem("camera-basket", cameraListJson);
  }

  const alertAddProduct = document.getElementById("alert");
    alertAddProduct.innerHTML = `
      <p>Votre article a été ajouté au panier !</p>
    `
  
  

}

function lenseChoice (cameraLense) {
  const lenses = document.getElementById("option");
  lenses.innerHTML = `
  <form id="choice">
    <span>Option :</span>
    <input type="radio" class="lense" name="lense" value="lense-1">
    <label for="lense-1">${cameraLense.lenses[0]}</label>
    <input type="radio" class="lense" name="lense" value="lense-2">
    <label for="lense-2">${cameraLense.lenses[1]}</label>
  </form>
  `
   let elt = document.getElementById("choice").addEventListener("change", function () {
    let eltChecked = document.getElementsByClassName("lense");
    for ( i = 0; i < eltChecked.length; i++) {
    if ( eltChecked[i].checked ) break;

  }
  console.log(eltChecked[i].value);
  localStorage.setItem("Option", eltChecked[i].value);
})
  
}



function priceItem (cameraPrice) {
  const price1 = document.getElementById("price");
  const cameraPrice1 = parseFloat(cameraPrice.price)/1000;
    const cameraPriceDecimal = cameraPrice1.toFixed(2);
  price1.innerHTML = `
    <p>Prix: ${cameraPriceDecimal} €</p>

  `
}







