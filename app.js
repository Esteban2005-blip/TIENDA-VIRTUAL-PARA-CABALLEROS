// app.js - Lógica principal de la tienda de ropa para caballeros

// Productos de ejemplo (puedes reemplazar o cargar desde un backend)
const productos = [
  { id: 1, nombre: "Camisa Clásica", tipo: "camisa", precio: 35000, imagen: "img/camisaclasica1.jpg", destacado: true },
  { id: 2, nombre: "Pantalón Slim", tipo: "pantalon", precio: 42000, imagen: "img/pantalonslim1.jpg", destacado: true },
  { id: 3, nombre: "Chaqueta Casual", tipo: "chaqueta", precio: 65000, imagen: "img/chaquetacasual1.jpg", destacado: true },
  { id: 4, nombre: "Camisa Rayas", tipo: "camisa", precio: 37000, imagen: "img/camisaarayas.jpg" },
  { id: 5, nombre: "Pantalón Formal", tipo: "pantalon", precio: 48000, imagen: "img/pantalonformal.jpg" },
  { id: 6, nombre: "Chaqueta Elegante", tipo: "chaqueta", precio: 72000, imagen: "img/chaquetaelegante1.jpg" },
  { id: 7, nombre: "Zapatos Casuales", tipo: "zapatos", precio: 55000, imagen: "img/zapatoscasuales1.jpg" },
  { id: 8, nombre: "Zapatos Formales", tipo: "zapatos", precio: 69000, imagen: "img/zapatosformales1.jpg" },
  { id: 9, nombre: "Bufanda de Invierno", tipo: "bufanda", precio: 25000, imagen: "img/bufanda1.jpg" },
  { id: 10, nombre: "Calcetines de Vestir", tipo: "calcetines", precio: 8000, imagen: "img/calcetinesdevestir1.jpg" },
  { id: 11, nombre: "Cinturón de Cuero", tipo: "cinturon", precio: 18000, imagen: "img/cinturonesdecuero1.jpg" },
  { id: 12, nombre: "Corbata Elegante", tipo: "corbata", precio: 12000, imagen: "img/corbatas1.jpg" },
  { id: 13, nombre: "Lentes de Sol", tipo: "lentes", precio: 30000, imagen: "img/lentesdesol1.jpg" },
  { id: 14, nombre: "Pulsera de Cuero", tipo: "pulsera", precio: 10000, imagen: "img/pulseradecuero1.jpg" },
  { id: 15, nombre: "Pulsera de Plata", tipo: "pulsera", precio: 15000, imagen: "img/pulseradeplata1.jpg" },
  { id: 16, nombre: "Reloj Elegante", tipo: "reloj", precio: 85000, imagen: "img/relojelegante.jpg" }
];

let carrito = [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Utilidades
function mostrarFeedback(mensaje) {
  const feedback = document.getElementById('mensajeFeedback');
  feedback.textContent = mensaje;
  feedback.classList.add('active');
  setTimeout(() => feedback.classList.remove('active'), 2000);
}

// Renderizado de productos
function renderProductos(lista, contenedor, mostrarFavoritos = true) {
  contenedor.innerHTML = '';
  lista.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'producto';
    // Tallas comunes
    let tallas = '';
    if (prod.tipo === 'camisa' || prod.tipo === 'pantalon' || prod.tipo === 'chaqueta') {
      tallas = `<label style='margin:0.5rem 0 0.5rem 0;display:block;'>Talla:
        <select class="select-talla" data-id="${prod.id}">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>`;
    } else if (prod.tipo === 'zapatos') {
      tallas = `<label style='margin:0.5rem 0 0.5rem 0;display:block;'>Talla:
        <select class="select-talla" data-id="${prod.id}">
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
        </select>
      </label>`;
    }
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <div class="precio">$${prod.precio.toLocaleString()}</div>
      ${tallas}
      <div class="botones">
        <button class="btn btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
        ${mostrarFavoritos ? `<button class="btn-fav${favoritos.includes(prod.id) ? ' favorito' : ''}" data-id="${prod.id}" title="Favorito">&#10084;</button>` : ''}
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// Render destacados
function renderDestacados() {
  const destacados = productos.filter(p => p.destacado);
  renderProductos(destacados, document.getElementById('destacados'));
}

// Render catálogo
function renderCatalogo(filtro = '', busqueda = '') {
  const tipos = [
    { tipo: 'camisa', titulo: 'Camisas' },
    { tipo: 'pantalon', titulo: 'Pantalones' },
    { tipo: 'chaqueta', titulo: 'Chaquetas' },
    { tipo: 'zapatos', titulo: 'Zapatos' },
    { tipo: 'bufanda', titulo: 'Bufandas' },
    { tipo: 'calcetines', titulo: 'Calcetines de Vestir' },
    { tipo: 'cinturon', titulo: 'Cinturones de Cuero' },
    { tipo: 'corbata', titulo: 'Corbatas' },
    { tipo: 'lentes', titulo: 'Lentes de Sol' },
    { tipo: 'pulsera', titulo: 'Pulseras' },
    { tipo: 'reloj', titulo: 'Relojes Elegantes' }
  ];
  const contenedor = document.getElementById('catalogoProductos');
  contenedor.innerHTML = '';
  tipos.forEach(({ tipo, titulo }) => {
    let lista = productos.filter(p =>
      (filtro === '' || p.tipo === filtro) &&
      (busqueda === '' || p.nombre.toLowerCase().includes(busqueda.toLowerCase())) &&
      p.tipo === tipo
    );
    if (lista.length > 0) {
      const h3 = document.createElement('h3');
      h3.textContent = titulo;
      h3.className = 'catalogo-section-title';
      contenedor.appendChild(h3);
      const grid = document.createElement('div');
      grid.className = 'productos-grid';
      renderProductos(lista, grid);
      contenedor.appendChild(grid);
    }
  });
}

// Render carrito
function renderCarrito() {
  const cont = document.getElementById('carritoProductos');
  cont.innerHTML = '';
  if (carrito.length === 0) {
    cont.innerHTML = '<p>El carrito está vacío.</p>';
    document.getElementById('carritoTotal').textContent = '';
    return;
  }
  carrito.forEach(item => {
    const prod = productos.find(p => p.id === item.id);
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <span class="nombre">${prod.nombre} <span style="font-size:0.95em;color:#555;">Talla: ${item.talla || 'Única'}</span></span>
      <input type="number" class="cantidad" min="1" value="${item.cantidad}" data-id="${item.id}" data-talla="${item.talla}" />
      <span>$${(prod.precio * item.cantidad).toLocaleString()}</span>
      <button class="btn-eliminar" data-id="${item.id}" data-talla="${item.talla}">Eliminar</button>
    `;
    cont.appendChild(div);
  });
  const total = carrito.reduce((acc, item) => {
    const prod = productos.find(p => p.id === item.id);
    return acc + prod.precio * item.cantidad;
  }, 0);
  document.getElementById('carritoTotal').textContent = `Total: $${total.toLocaleString()}`;
}

// Favoritos
function toggleFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderDestacados();
  renderCatalogo(document.getElementById('filtroTipo').value, document.getElementById('buscador').value);
}

// Eventos globales
function setupEventos() {
  // Navegación suave
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  // Comprar ahora
  document.getElementById('comprarAhoraBtn').onclick = () => {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  };
  // Filtros
  document.getElementById('filtroTipo').onchange = e => {
    renderCatalogo(e.target.value, document.getElementById('buscador').value);
  };
  document.getElementById('buscador').oninput = e => {
    renderCatalogo(document.getElementById('filtroTipo').value, e.target.value);
  };
  // Delegación de eventos para productos
  document.getElementById('catalogoProductos').onclick = e => {
    if (e.target.classList.contains('btn-agregar')) {
      agregarAlCarrito(Number(e.target.dataset.id));
    }
    if (e.target.classList.contains('btn-fav')) {
      toggleFavorito(Number(e.target.dataset.id));
    }
  };
  document.getElementById('destacados').onclick = e => {
    if (e.target.classList.contains('btn-agregar')) {
      agregarAlCarrito(Number(e.target.dataset.id));
    }
    if (e.target.classList.contains('btn-fav')) {
      toggleFavorito(Number(e.target.dataset.id));
    }
  };
  // Carrito
  document.getElementById('carritoProductos').onclick = e => {
    if (e.target.classList.contains('btn-eliminar')) {
      eliminarDelCarrito(Number(e.target.dataset.id), e.target.dataset.talla);
    }
  };
  document.getElementById('carritoProductos').oninput = e => {
    if (e.target.classList.contains('cantidad')) {
      cambiarCantidad(Number(e.target.dataset.id), Number(e.target.value), e.target.dataset.talla);
    }
  };
  // Finalizar compra
  document.getElementById('finalizarCompraBtn').onclick = () => {
    if (carrito.length === 0) {
      mostrarFeedback('El carrito está vacío.');
      return;
    }
    document.getElementById('formularioCompra').classList.add('active');
  };
  document.getElementById('cancelarCompraBtn').onclick = () => {
    document.getElementById('formularioCompra').classList.remove('active');
  };
  // Formulario de compra
  document.getElementById('compraForm').onsubmit = e => {
    e.preventDefault();
    if (validarFormulario(e.target)) {
      carrito = [];
      renderCarrito();
      document.getElementById('formularioCompra').classList.remove('active');
      mostrarFeedback('¡Compra realizada con éxito!');
      e.target.reset();
    }
  };
}

function agregarAlCarrito(id) {
  // Obtener talla seleccionada
  let talla = 'Única';
  const select = document.querySelector(`.select-talla[data-id='${id}']`);
  if (select) talla = select.value;
  const idx = carrito.findIndex(item => item.id === id && item.talla === talla);
  if (idx > -1) {
    carrito[idx].cantidad++;
  } else {
    carrito.push({ id, cantidad: 1, talla });
  }
  renderCarrito();
  mostrarFeedback('Producto agregado al carrito');
}

function eliminarDelCarrito(id, talla = null) {
  if (talla) {
    carrito = carrito.filter(item => !(item.id === id && item.talla === talla));
  } else {
    carrito = carrito.filter(item => item.id !== id);
  }
  renderCarrito();
  mostrarFeedback('Producto eliminado');
}

function cambiarCantidad(id, cantidad, talla = null) {
  if (cantidad < 1) return;
  const item = carrito.find(i => i.id === id && (talla ? i.talla === talla : true));
  if (item) item.cantidad = cantidad;
  renderCarrito();
}

function validarFormulario(form) {
  let valido = true;
  Array.from(form.elements).forEach(el => {
    if (el.required && !el.value.trim()) {
      el.style.border = '2px solid #e63946';
      valido = false;
    } else {
      el.style.border = '';
    }
  });
  if (!valido) mostrarFeedback('Por favor, completa todos los campos.');
  return valido;
}

// Inicialización
renderDestacados();
renderCatalogo();
renderCarrito();
setupEventos();
