const cameraListElement = document.getElementById("cameraList");
//1.affiche tout les objets "camera" dans une grid.
function renderCameraList(cameras) {
  for (camera of cameras) {
    const cameraElement = document.createElement("a");
    cameraElement.setAttribute("href", `product.html?id=${camera._id}`);
    const cameraPrice = parseFloat(camera.price) / 100;
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
    `;
    cameraListElement.appendChild(cameraElement);
  }
}
//2.Récupere les objets "camera" présents dans le back-end.
fetch("http://localhost:3000/api/cameras")
  .then((response) => response.json())
  .then((cameras) => renderCameraList(cameras));
