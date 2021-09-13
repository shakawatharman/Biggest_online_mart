/* Load products fuction */
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
    document.getElementById('all-products').innerHTML='';
};


loadProducts();

 /* Showing all products on UI */
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p class="fw-bold">Category: ${product.category}</p>
      <p class="fw-bold">Average Ratings: ${product.rating.rate}</p>
      <p class="fw-bold">Total Reviews: ${product.rating.count}</p>
      <h4>Price: <span class="fw-bold">$ ${product.price}</span></h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
/* Counting the selected product by User and set it on UI  */
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;

    updatePrice("price", price);

  updateTaxAndCharge();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
 
  return converted;
};

/* Updating total function */
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = value;
 
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);

  updateTotal()
};

/* Set innertext to Cart function */
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;

  updateTotal()
};

/* Update delivery charge and tax function */
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 200 && priceConverted < 400) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  else if (priceConverted > 400 && priceConverted < 500) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  else if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }

  updateTotal()
};

/* Grand total function */
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/* Thanking the customer function */
const buyNow = () => {
  const header = document.getElementById('header');
  document.getElementById('main').innerHTML='';
  header.classList.remove('d-none');
  header.classList.add('d-block');
}