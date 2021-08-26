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
  quantityItem();
  priceItem(camera);
});



function addCameraToBasket(cameraObject) {

  const quantityElementValue = document.getElementById("product-quantity").value;

  if (!window.localStorage.getItem("camera-basket") ){
    const cameraList = [cameraObject._id, quantityElementValue];
    const cameraListJson = JSON.stringify(cameraList);
    window.localStorage.setItem("camera-basket", cameraListJson);

  }else{
    let cameraListJson = window.localStorage.getItem("camera-basket");
    const cameraList = JSON.parse(cameraListJson);
    cameraList.push(cameraObject._id, quantityElementValue);
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

const quantityValue = `
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>

  `;

function quantityItem () {
  
  const quantityElement = document.getElementById("product-quantity");
  quantityElement.innerHTML = quantityValue;

}

function priceItem (cameraPrice) {
  const price1 = document.getElementById("price");
  const cameraPrice1 = parseFloat(cameraPrice.price)/1000;
    const cameraPriceDecimal = cameraPrice1.toFixed(2);
  price1.innerHTML = `
    <p>Prix: ${cameraPriceDecimal} €</p>

  `
}





