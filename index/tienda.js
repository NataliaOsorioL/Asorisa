// === Variables principales ===
const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Productos base (puedes cambiar o ampliar)
const productos = [
  { nombre: "Camiseta Apoyo Verde", precio: 45000, imagen: "camiseta.jpg" },
  { nombre: "Pulsera Artesanal", precio: 20000, imagen: "pulsera.jpg" },
  { nombre: "Curso de LSC", precio: 80000, imagen: "curso.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.querySelector(".productos");

// === Mostrar productos dinámicamente ===
function mostrarProductos() {
  contenedorProductos.innerHTML = "";
  productos.forEach((p, i) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <p class="product-desc">${p.nombre}</p>
      <h3 class="product-title">${p.nombre}</h3>
      <p class="product-price">$${p.precio.toLocaleString("es-CO")} COP</p>
      <button class="btn add-to-cart" data-index="${i}">Añadir al Carrito</button>
    `;
    contenedorProductos.appendChild(card);
  });
}

// === Agregar producto al carrito ===
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const index = e.target.dataset.index;
    const producto = productos[index];
    const item = carrito.find(p => p.nombre === producto.nombre);

    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }

  // Eliminar producto
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }
});

// === Mostrar / Ocultar carrito desplegable ===
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartDropdown.classList.toggle("hidden");
  renderCarrito();
});

// === Renderizar contenido del carrito ===
function renderCarrito() {
  cartItems.innerHTML = "";
  if (carrito.length === 0) {
    cartItems.innerHTML = "<p>🛒 Tu carrito está vacío</p>";
    cartTotal.textContent = "Total: $0 COP";
    return;
  }

  let totalCompra = 0;
  carrito.forEach((item, i) => {
    totalCompra += item.precio * item.cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <button class="remove-item" data-index="${i}">&times;</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `Total: $${totalCompra.toLocaleString("es-CO")} COP`;
}

// === Inicialización ===
mostrarProductos();
renderCarrito();
