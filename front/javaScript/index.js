
const cameraListElement = document.getElementById("cameraList");


function renderCameraList(cameras) {
  for (camera of cameras) {
    const cameraElement = document.createElement("a")
    cameraElement.setAttribute("href",`product.html?id=${camera._id}`)
    const cameraPrice = parseFloat(camera.price)/1000;
    const cameraPriceDecimal = cameraPrice.toFixed(2);
    cameraElement.innerHTML = `
      <div class="bcg-1">
      <img src="${camera.imageUrl}" class="img-item">
      <div class="info">
      <div id="bcg-2">
      <p id="price-1">${cameraPriceDecimal} €<p>
      </div>
      <p id="model-name">${camera.name}<p>
      </div>
      <button id="details-product">Détails</button>
      <div>
    `
    cameraListElement.appendChild(cameraElement);
    
  }
 
}


fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(cameras => renderCameraList(cameras));


