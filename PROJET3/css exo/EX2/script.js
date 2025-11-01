// Store all guests and their orders
const guests = [];
let currentItems = []; // Items being added before placing order

// Register a new guest
function registerGuest() {
  const name = document.getElementById('guest-name').value;
  const room = document.getElementById('room-number').value;

  if (name && room) {
    const guest = {
      name,
      room,
      orders: [] // list of orders
    };
    guests.push(guest);
    updateGuestDropdowns();
    alert("Guest registered successfully!");
    document.getElementById('guest-name').value = '';
    document.getElementById('room-number').value = '';
  } else {
    alert("Please fill in all guest fields.");
  }
}

// Update guest select dropdowns
function updateGuestDropdowns() {
  const selects = [document.getElementById('guest-select'), document.getElementById('guest-order-select')];
  selects.forEach(select => {
    select.innerHTML = '';
    guests.forEach((guest, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${guest.name} (Room ${guest.room})`;
      select.appendChild(option);
    });
  });
}

// Add item to current order
function addItem() {
  const name = document.getElementById('item-name').value;
  const price = parseFloat(document.getElementById('item-price').value);
  if (name && !isNaN(price)) {
    currentItems.push({ name, price });

    const li = document.createElement('li');
    li.textContent = `${name} - $${price.toFixed(2)}`;
    document.getElementById('order-items').appendChild(li);

    // Clear fields
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
  } else {
    alert("Enter valid item name and price.");
  }
}

// Place the current order
function placeOrder() {
  const guestIndex = document.getElementById('guest-select').value;
  if (currentItems.length === 0) {
    alert("No items to place.");
    return;
  }

  const guest = guests[guestIndex];
  guest.orders.push([...currentItems]); // push a copy of the items
  currentItems = [];
  document.getElementById('order-items').innerHTML = '';
  alert("Order placed successfully!");
}

// Display all orders for selected guest
function displayOrders() {
  const guestIndex = document.getElementById('guest-order-select').value;
  const guest = guests[guestIndex];
  const output = document.getElementById('orders-output');
  output.innerHTML = '';

  if (guest.orders.length === 0) {
    output.textContent = "No orders yet.";
    return;
  }

  let total = 0;
  guest.orders.forEach((order, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>Order ${i + 1}</strong><ul>${order.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}</ul>`;
    output.appendChild(div);
    total += order.reduce((sum, item) => sum + item.price, 0);
  });

  const totalDiv = document.createElement('p');
  totalDiv.innerHTML = `<strong>Total Bill: $${total.toFixed(2)}</strong>`;
  output.appendChild(totalDiv);
}
