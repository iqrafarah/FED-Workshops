const PRODUCTS = [
  {
    id: 1,
    name: 'Alpine 3-Persoons Tent',
    price: 249.95,
    category: 'tenten',
    badge: 'Nieuw',
    emoji: '⛺',
  },
  {
    id: 1,
    name: 'frnk ocean',
    price: 11,
    hello: 22,
  },
  {
    id: 2,
    name: 'Trailblazer Rugzak 40L',
    price: 89.95,
    category: 'rugzakken',
    emoji: '🎒',
  },
  {
    id: 3,
    name: 'Merino Wandelshirt',
    price: 39.95,
    wasPrice: 54.95,
    category: 'kleding',
    badge: 'sale',
    emoji: '👕',
  },
  {
    id: 4,
    name: 'Thermosfles 750ml',
    price: 24.95,
    category: 'uitrusting',
    emoji: '🧴',
  },
  {
    id: 5,
    name: 'Regenjas Storm-Shell',
    price: 129.95,
    category: 'kleding',
    emoji: '🧥',
  },
  {
    id: 6,
    name: 'Slaapzak Comfort -5°C',
    price: 99.95,
    category: 'uitrusting',
    soldOut: true,
    emoji: '🛏️',
  },
  {
    id: 7,
    name: 'Wandelschoenen TrailGrip',
    price: 149.95,
    category: 'kleding',
    badge: 'Nieuw',
    emoji: '🥾',
  },
  {
    id: 8,
    name: 'Hoofdlamp LumenPro',
    price: 34.95,
    category: 'uitrusting',
    emoji: '🔦',
  },
  {
    id: 9,
    name: 'Kompas & Kaarthouder',
    price: 19.95,
    wasPrice: 27.5,
    category: 'uitrusting',
    badge: 'sale',
    emoji: '🧭',
  },
];

const cart = {};

function euro(n) {
  return '€' + n.toFixed(2).replace('.', ',');
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = PRODUCTS.map((p) => {
    let badgeHtml = '';
    if (p.badge === 'sale') {
      badgeHtml = `<span class="badge badge--sale" title="">🔥</span>`;
    } else if (p.badge === 'Nieuw') {
      badgeHtml = `<span class="badge">Nieuw</span>`;
    } else if (p.soldOut) {
      badgeHtml = `<span class="badge badge--soldout">&nbsp;</span>`;
    }

    const priceHtml = p.wasPrice
      ? `<span class="price--was">${euro(p.wasPrice)}</span><span class="price">${euro(p.price)}</span>`
      : `<span class="price">${euro(p.price)}</span>`;

    return `
      <div class="product-card" onclick="viewProduct(${p.id})">
        <div class="product-media">
          ${badgeHtml}
          ${p.emoji}
          <span aria-hidden="true">${p.emoji}</span>
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">${p.soldOut ? 'Tijdelijk niet op voorraad' : 'Op voorraad'}</div>
          <div class="product-price-row">${priceHtml}</div>
          <button type="button" class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
            ${p.soldOut ? 'Niet beschikbaar' : 'Voeg toe aan winkelwagen'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function viewProduct(id) {
  showToast(PRODUCTS.find((p) => p.id === id).name + ' geopend');
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (product.soldOut) return;
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();

  showToast(`${product.name} toegevoegd aan winkelwagen`);
}

function changeQty(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  if (cart[id] === 0) delete cart[id];
  updateCartUI();
}

function updateCartUI() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  document.getElementById('cart-count').textContent = count;

  const itemsEl = document.getElementById('cart-items');
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    itemsEl.innerHTML = `<p class="empty-state">Je winkelwagen is nog leeg.</p>`;
  } else {
    let total = 0;
    itemsEl.innerHTML = ids
      .map((id) => {
        const p = PRODUCTS.find((pp) => pp.id == id);
        const qty = cart[id];
        total += p.price * qty;
        return `
        <div class="cart-line">
          <span>${p.name}</span>
          <span class="qty-stepper">
            <!-- ISSUE 17: +/- stappers zijn <span onclick>, geen <button>, geen labels -->
            <span class="qty-step" onclick="changeQty(${id}, -1)">−</span>
            ${qty}
            <span class="qty-step" onclick="changeQty(${id}, 1)">+</span>
          </span>
          <span>${euro(p.price * qty)}</span>
        </div>
      `;
      })
      .join('');
    document.getElementById('cart-total').textContent = euro(total);
  }
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.getElementById('modal-overlay').classList.remove('open');
}

document.getElementById('modal-overlay').addEventListener('click', () => {
  document
    .querySelectorAll('.modal.open')
    .forEach((m) => m.classList.remove('open'));
  document.getElementById('modal-overlay').classList.remove('open');
});

function validateCheckout(e) {
  const emailInput = document.getElementById('checkout-email');
  const email = emailInput.value;
  if (!email.includes('@')) {
    emailInput.classList.add('invalid');
    return false;
  }
  emailInput.classList.remove('invalid');
  showToast('Bestelling geplaatst — bedankt!');
  closeModal('checkout-modal');
  return false;
}

function toggleFilter(key) {
  const body = document.getElementById('filter-' + key);
  body.style.display = body.style.display === 'none' ? 'flex' : 'none';
}

function toggleSort() {
  document.getElementById('sort-menu').classList.toggle('open');
}
function setSort(label) {
  document.querySelector('.sort-current').textContent = 'Sorteer op: ' + label;
  document.getElementById('sort-menu').classList.remove('open');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.sort-dropdown')) {
    document.getElementById('sort-menu').classList.remove('open');
  }
});

function doSearch() {
  const q = document.querySelector('.search-input').value;
  if (q) showToast(`Zoeken naar "${q}" ...`);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}

renderProducts();
updateCartUI();
