const cart = [];
const cartItemsElement = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

function addToCart(button) {
  const productElement = button.parentElement;
  const name = productElement.getAttribute("data-name");
  const price = parseFloat(productElement.getAttribute("data-price"));
  const quantityInput = productElement.querySelector(".quantity");
  const quantity = parseInt(quantityInput.value);

  if (quantity <= 0) {
    alert("La quantità deve essere maggiore di 0.");
    return;
  }

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  updateCart();
}

function removeFromCart(name) {
  const itemIndex = cart.findIndex(item => item.name === name);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
  }
  updateCart();
}

function updateCart() {
  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    
    const removeButton = document.createElement("button");
    removeButton.textContent = "Rimuovi";
    removeButton.onclick = () => removeFromCart(item.name);

    li.appendChild(removeButton);
    cartItemsElement.appendChild(li);
  });

  totalElement.textContent = `Totale: $${total.toFixed(2)}`;
}


function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (total > 0) {
      alert(`Grazie per il tuo acquisto! Il totale è $${total.toFixed(2)}.`);
      cart.length = 0; // Pulisce il carrello
      updateCart(); // Aggiorna la visualizzazione del carrello
    } else {
      alert("Il carrello è vuoto. Aggiungi dei prodotti per acquistare.");
    }
  }
  