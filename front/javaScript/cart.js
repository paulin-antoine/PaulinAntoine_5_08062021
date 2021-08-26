
const productInLocalStorage = JSON.parse(window.localStorage.getItem("camera-basket"));
const addProductInRecap = JSON.stringify(window.localStorage.getItem("camera-basket"))
const recapLine2 = document.getElementById("basket-line-2");

function viewRecap (camera) {
if (productInLocalStorage == null){
    const noProduct = `
        <p id="noProduct"> Le panier est vide </p>

    `
    recapLine2.innerHTML = noProduct;

}else{

    for (i = 0; i < productInLocalStorage.length; i++) {
        
        recapLine2.innerHTML = `
            ${addProductInRecap[i]._id}
        `
    }

    console.log(addProductInRecap[i]._id);


}
}

fetch(`http://localhost:3000/api/cameras/`)
.then(response => response.json())
.then(camera => viewRecap(camera));
