// app.js - Lógica principal de la tienda de ropa para caballeros

// Productos con información completa
const productos = [
  { id: 1, nombre: "Camisa Clásica", tipo: "camisa", precio: 35000, imagen: "img/camisaclasica1.jpg", destacado: true, descripcion: "Camisa de algodón 100% para el look clásico perfecto." },
  { id: 2, nombre: "Pantalón Slim", tipo: "pantalon", precio: 42000, imagen: "img/pantalonslim1.jpg", destacado: true, descripcion: "Pantalón ajustado moderno con excelente comodidad." },
  { id: 3, nombre: "Chaqueta Casual", tipo: "chaqueta", precio: 65000, imagen: "img/chaquetacasual1.jpg", destacado: true, descripcion: "Chaqueta versátil para cualquier ocasión." },
  { id: 4, nombre: "Camisa Rayas", tipo: "camisa", precio: 37000, imagen: "img/camisaarayas.jpg", descripcion: "Camisa a rayas de alta calidad." },
  { id: 5, nombre: "Pantalón Formal", tipo: "pantalon", precio: 48000, imagen: "img/pantalonformal.jpg", descripcion: "Pantalón formal para eventos especiales." },
  { id: 6, nombre: "Chaqueta Elegante", tipo: "chaqueta", precio: 72000, imagen: "img/chaquetaelegante1.jpg", descripcion: "Chaqueta elegante de diseño premium." },
  { id: 7, nombre: "Zapatos Casuales", tipo: "zapatos", precio: 55000, imagen: "img/zapatoscasuales1.jpg", descripcion: "Zapatos cómodos para el día a día." },
  { id: 8, nombre: "Zapatos Formales", tipo: "zapatos", precio: 69000, imagen: "img/zapatosformales1.jpg", descripcion: "Zapatos formales de cuero genuino." },
  { id: 9, nombre: "Bufanda de Invierno", tipo: "bufanda", precio: 25000, imagen: "img/bufanda1.jpg", descripcion: "Bufanda cálida para el invierno." },
  { id: 10, nombre: "Calcetines de Vestir", tipo: "calcetines", precio: 8000, imagen: "img/calcetinesdevestir1.jpg", descripcion: "Calcetines de vestir de algodón." },
  { id: 11, nombre: "Cinturón de Cuero", tipo: "cinturon", precio: 18000, imagen: "img/cinturonesdecuero1.jpg", descripcion: "Cinturón de cuero natural." },
  { id: 12, nombre: "Corbata Elegante", tipo: "corbata", precio: 12000, imagen: "img/corbatas1.jpg", descripcion: "Corbata de seda para ocasiones formales." },
  { id: 13, nombre: "Lentes de Sol", tipo: "lentes", precio: 30000, imagen: "img/lentesdesol1.jpg", descripcion: "Lentes de sol de diseño moderno." },
  { id: 14, nombre: "Pulsera de Cuero", tipo: "pulsera", precio: 10000, imagen: "img/pulseradecuero1.jpg", descripcion: "Pulsera de cuero auténtico." },
  { id: 15, nombre: "Pulsera de Plata", tipo: "pulsera", precio: 15000, imagen: "img/pulseradeplata1.jpg", descripcion: "Pulsera de plata elegante." },
  { id: 16, nombre: "Reloj Elegante", tipo: "reloj", precio: 85000, imagen: "img/relojelegante.jpg", descripcion: "Reloj de pulsera de lujo." }
];

let carrito = [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Validación de correo
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validación de teléfono
function validarTelefono(telefono) {
  const regex = /^\d{7,}$/;
  return regex.test(telefono.replace(/[^\d]/g, ''));
}

// Mostrar feedback con tipo
function mostrarFeedback(mensaje, tipo = 'exito') {
  const feedback = document.getElementById('mensajeFeedback');
  feedback.textContent = mensaje;
  feedback.className = 'feedback active';
  if (tipo === 'error') feedback.classList.add('error');
  if (tipo === 'warning') feedback.classList.add('warning');
  if (tipo === 'info') feedback.classList.add('info');
  setTimeout(() => feedback.classList.remove('active'), 4000);
}

// Indicador de estado del sistema (Nielsen #1)
function mostrarIndicadorEstado(activo = true) {
  const indicador = document.getElementById('indicadorEstado');
  if (activo) {
    indicador.classList.add('activo');
  } else {
    indicador.classList.remove('activo');
  }
}

// Renderizado de productos
function renderProductos(lista, contenedor, mostrarFavoritos = true) {
  contenedor.innerHTML = '';
  lista.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'producto';
    
    // Tallas según tipo
    let tallas = '';
    if (prod.tipo === 'camisa' || prod.tipo === 'pantalon' || prod.tipo === 'chaqueta') {
      tallas = `<label style='margin:0.5rem 0;display:block;font-size:0.9rem;'>Talla:
        <select class="select-talla" data-id="${prod.id}" aria-label="Seleccionar talla">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </label>`;
    } else if (prod.tipo === 'zapatos') {
      tallas = `<label style='margin:0.5rem 0;display:block;font-size:0.9rem;'>Talla:
        <select class="select-talla" data-id="${prod.id}" aria-label="Seleccionar talla">
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
        </select>
      </label>`;
    }
    
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <div class="precio">$${prod.precio.toLocaleString()}</div>
      ${tallas}
      <div class="botones">
        <button class="btn btn-agregar" data-id="${prod.id}" aria-label="Agregar ${prod.nombre} al carrito">Agregar</button>
        ${mostrarFavoritos ? `<button class="btn-fav${favoritos.includes(prod.id) ? ' favorito' : ''}" data-id="${prod.id}" aria-label="Agregar ${prod.nombre} a favoritos" title="Favorito">&#10084;</button>` : ''}
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
    { tipo: 'cinturon', titulo: 'Cinturones' },
    { tipo: 'corbata', titulo: 'Corbatas' },
    { tipo: 'lentes', titulo: 'Lentes de Sol' },
    { tipo: 'pulsera', titulo: 'Pulseras' },
    { tipo: 'reloj', titulo: 'Relojes' }
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
  
  if (contenedor.innerHTML === '') {
    contenedor.innerHTML = '<p style="text-align:center;padding:2rem;">No hay productos que coincidan con tu búsqueda.</p>';
  }
}

// Render carrito
function renderCarrito() {
  const cont = document.getElementById('carritoProductos');
  const totalEl = document.getElementById('carritoTotal');
  cont.innerHTML = '';
  
  if (carrito.length === 0) {
    cont.innerHTML = '<div class="estado-vacio"><p>Tu carrito está vacío</p><p style="font-size:0.9rem;">Agrega productos para empezar</p></div>';
    totalEl.textContent = '';
    actualizarContadorCarrito();
    return;
  }
  
  carrito.forEach(item => {
    const prod = productos.find(p => p.id === item.id);
    if (!prod) return;
    
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <span class="nombre">
        <strong>${prod.nombre}</strong>
        <div style="font-size:0.85em;color:#555;">Talla: ${item.talla || 'Única'}</div>
      </span>
      <input type="number" class="cantidad" min="1" value="${item.cantidad}" data-id="${item.id}" data-talla="${item.talla}" aria-label="Cantidad de ${prod.nombre}" />
      <span style="min-width:80px;text-align:right;font-weight:600;">$${(prod.precio * item.cantidad).toLocaleString()}</span>
      <button class="btn-eliminar" data-id="${item.id}" data-talla="${item.talla}" aria-label="Eliminar ${prod.nombre} del carrito">Eliminar</button>
    `;
    cont.appendChild(div);
  });
  
  const total = carrito.reduce((acc, item) => {
    const prod = productos.find(p => p.id === item.id);
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);
  
  totalEl.textContent = `Total: $${total.toLocaleString()}`;
  actualizarContadorCarrito();
}

// Actualizar resumen en modal de compra (Nielsen #1 - Visibilidad)
function actualizarResumenCompra() {
  const resumen = document.getElementById('resumenCarritoCompra');
  if (!resumen) return;
  
  resumen.innerHTML = '';
  let total = 0;
  
  carrito.forEach(item => {
    const prod = productos.find(p => p.id === item.id);
    if (!prod) return;
    
    const subtotal = prod.precio * item.cantidad;
    total += subtotal;
    
    const div = document.createElement('div');
    div.className = 'resumen-compra-item';
    div.innerHTML = `
      <span>${prod.nombre} (${item.cantidad}x $${prod.precio.toLocaleString()})</span>
      <span>$${subtotal.toLocaleString()}</span>
    `;
    resumen.appendChild(div);
  });
  
  const divTotal = document.createElement('div');
  divTotal.className = 'resumen-compra-item';
  divTotal.innerHTML = `
    <span>TOTAL:</span>
    <span>$${total.toLocaleString()}</span>
  `;
  resumen.appendChild(divTotal);
}

// Actualizar contador del carrito en navegación
function actualizarContadorCarrito() {
  const contador = document.querySelector('.carrito-count');
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  if (contador) contador.textContent = `(${totalItems})`;
}

// Mostrar detalles del producto
function mostrarDetalleProducto(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;
  
  const modal = document.getElementById('detalleProductoModal');
  const content = document.getElementById('detalleProductoContent');
  
  content.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%;max-width:400px;border-radius:8px;margin-bottom:1.5rem;">
    <h2>${prod.nombre}</h2>
    <div class="precio" style="font-size:1.5rem;margin:1rem 0;">\$${prod.precio.toLocaleString()}</div>
    <p style="line-height:1.8;color:#555;">${prod.descripcion}</p>
    <p><strong>Categoría:</strong> ${prod.tipo.charAt(0).toUpperCase() + prod.tipo.slice(1)}</p>
  `;
  
  modal.classList.add('active');
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
  renderFavoritos();
  actualizarContadorFavoritos();
  mostrarFeedback('Favorito actualizado');
}

// Renderizar favoritos
function renderFavoritos() {
  const contenedor = document.getElementById('productosFavoritos');
  const vacio = document.getElementById('favoritosVacio');
  
  if (!contenedor) return;
  
  const productosFav = productos.filter(p => favoritos.includes(p.id));
  
  if (productosFav.length === 0) {
    contenedor.innerHTML = '';
    vacio.style.display = 'block';
  } else {
    vacio.style.display = 'none';
    renderProductos(productosFav, contenedor, true);
  }
}

// Actualizar contador de favoritos
function actualizarContadorFavoritos() {
  const contador = document.querySelector('.favoritos-count');
  if (contador) contador.textContent = `(${favoritos.length})`;
}

// Validar formulario
function validarFormulario(form) {
  let valido = true;
  let primerError = null;
  const erroresElementos = form.querySelectorAll('.error-msg');
  erroresElementos.forEach(el => el.classList.remove('show'));
  
  Array.from(form.elements).forEach(el => {
    // Saltar fieldsets y otros no-inputs
    if (!el.name || el.tagName === 'FIELDSET') return;
    
    const errorSpan = form.querySelector(`#error-${el.name}`);
    let esValido = true;
    
    // Validación requerida
    if (el.required) {
      if (el.tagName === 'SELECT') {
        esValido = el.value !== '' && el.value !== undefined;
      } else {
        esValido = el.value.trim() !== '';
      }
    }
    
    // Validaciones específicas
    if (esValido && el.type === 'email' && el.value.trim()) {
      esValido = validarEmail(el.value);
    }
    if (esValido && el.name === 'telefono' && el.value.trim()) {
      esValido = validarTelefono(el.value);
    }
    
    if (!esValido) {
      el.classList.add('error');
      if (errorSpan) {
        errorSpan.classList.add('show');
        if (el.type === 'email') {
          errorSpan.textContent = 'Correo inválido';
        } else if (el.name === 'telefono') {
          errorSpan.textContent = 'Teléfono inválido (mínimo 7 dígitos)';
        } else if (el.name === 'pago') {
          errorSpan.textContent = 'Selecciona un método de pago';
        } else {
          errorSpan.textContent = 'Este campo es obligatorio';
        }
      }
      if (!primerError) primerError = el;
      valido = false;
    } else {
      el.classList.remove('error');
    }
  });
  
  // Hacer scroll al primer campo inválido para que el usuario lo vea
  if (primerError) {
    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    primerError.focus();
  }
  
  return valido;
}

// Eventos globales
function setupEventos() {
  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Modal de detalles
  document.getElementById('detalleProductoModal').addEventListener('click', e => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
      document.getElementById('detalleProductoModal').classList.remove('active');
    }
  });
  
  // Comprar ahora
  document.getElementById('comprarAhoraBtn').onclick = () => {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Filtros
  document.getElementById('filtroTipo').onchange = e => {
    mostrarIndicadorEstado(true);
    setTimeout(() => {
      renderCatalogo(e.target.value, document.getElementById('buscador').value);
      mostrarIndicadorEstado(false);
    }, 300);
  };
  
  document.getElementById('buscador').oninput = e => {
    mostrarIndicadorEstado(true);
    setTimeout(() => {
      renderCatalogo(document.getElementById('filtroTipo').value, e.target.value);
      mostrarIndicadorEstado(false);
    }, 300);
  };
  
  // Delegación de eventos para productos en catálogo
  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-agregar')) {
      agregarAlCarrito(Number(e.target.dataset.id));
    }
    if (e.target.classList.contains('btn-fav')) {
      toggleFavorito(Number(e.target.dataset.id));
    }
  });
  
  // Carrito
  document.getElementById('carritoProductos').addEventListener('click', e => {
    if (e.target.classList.contains('btn-eliminar')) {
      eliminarDelCarrito(Number(e.target.dataset.id), e.target.dataset.talla);
    }
  });
  
  document.getElementById('carritoProductos').addEventListener('input', e => {
    if (e.target.classList.contains('cantidad')) {
      cambiarCantidad(Number(e.target.dataset.id), Number(e.target.value), e.target.dataset.talla);
    }
  });
  
  // Finalizar compra
  document.getElementById('finalizarCompraBtn').onclick = () => {
    if (carrito.length === 0) {
      mostrarFeedback('El carrito está vacío. Agrega productos primero.', 'warning');
      return;
    }
    actualizarResumenCompra();
    document.getElementById('formularioCompra').classList.add('active');
    mostrarFeedback('Completa el formulario para finalizar la compra', 'info');
  };
  
  document.getElementById('cancelarCompraBtn').onclick = () => {
    document.getElementById('formularioCompra').classList.remove('active');
    mostrarFeedback('Compra cancelada. Puedes continuar comprando.', 'info');
  };
  
  // Formulario de compra
  document.getElementById('compraForm').onsubmit = e => {
    e.preventDefault();
    if (validarFormulario(e.target)) {
      mostrarIndicadorEstado(true);
      setTimeout(() => {
        carrito = [];
        renderCarrito();
        document.getElementById('formularioCompra').classList.remove('active');
        mostrarFeedback('¡Compra realizada exitosamente! Te enviaremos un email de confirmación.', 'exito');
        mostrarIndicadorEstado(false);
        e.target.reset();
      }, 1500);
    } else {
      mostrarFeedback('Por favor completa todos los campos correctamente', 'error');
    }
  };
  
  // Formulario de contacto
  document.getElementById('formularioContacto').onsubmit = e => {
    e.preventDefault();
    if (validarFormulario(e.target)) {
      mostrarFeedback('¡Mensaje enviado correctamente! Nos contactaremos pronto.', 'exito');
      e.target.reset();
    } else {
      mostrarFeedback('Por favor completa todos los campos correctamente', 'error');
    }
  };
  
  // Atajos de teclado (Nielsen #2)
  document.addEventListener('keydown', e => {
    if (e.altKey) {
      switch(e.key) {
        case '1':
          e.preventDefault();
          document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
          mostrarFeedback('Ataljo: Ir a Inicio', 'info');
          break;
        case '2':
          e.preventDefault();
          document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
          mostrarFeedback('Ataljo: Ir a Productos', 'info');
          break;
        case '3':
          e.preventDefault();
          document.getElementById('carrito-section').scrollIntoView({ behavior: 'smooth' });
          mostrarFeedback('Ataljo: Ir a Carrito', 'info');
          break;
        case '4':
          e.preventDefault();
          document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
          mostrarFeedback('Ataljo: Ir a Contacto', 'info');
          break;
        case '5':
          e.preventDefault();
          document.getElementById('favoritos-section').scrollIntoView({ behavior: 'smooth' });
          mostrarFeedback('Ataljo: Ir a Mis Favoritos', 'info');
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          abrirAyuda();
          break;
      }
    } else if (e.key === 'Escape') {
      document.getElementById('detalleProductoModal').classList.remove('active');
      document.getElementById('formularioCompra').classList.remove('active');
      document.getElementById('modalAyuda').classList.remove('active');
    }
  });
  
  // Botón de ayuda (Nielsen #10)
  document.getElementById('btnAyuda').addEventListener('click', abrirAyuda);
  
  // Cerrar modal de ayuda
  document.getElementById('modalAyuda').addEventListener('click', e => {
    if (e.target === document.getElementById('modalAyuda') || e.target.classList.contains('modal-close')) {
      document.getElementById('modalAyuda').classList.remove('active');
      document.getElementById('modalAyuda').setAttribute('aria-hidden', 'true');
    }
  });
}

// Abrir modal de ayuda (Nielsen #10 - Ayuda y documentación)
function abrirAyuda() {
  const modal = document.getElementById('modalAyuda');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function agregarAlCarrito(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;
  
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
  mostrarFeedback(`${prod.nombre} agregado al carrito`);
}

function eliminarDelCarrito(id, talla = null) {
  if (talla) {
    carrito = carrito.filter(item => !(item.id === id && item.talla === talla));
  } else {
    carrito = carrito.filter(item => item.id !== id);
  }
  renderCarrito();
  mostrarFeedback('Producto eliminado del carrito');
}

function cambiarCantidad(id, cantidad, talla = null) {
  if (cantidad < 1) {
    eliminarDelCarrito(id, talla);
    return;
  }
  const item = carrito.find(i => i.id === id && (talla ? i.talla === talla : true));
  if (item) item.cantidad = cantidad;
  renderCarrito();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderDestacados();
  renderCatalogo();
  renderFavoritos();
  renderCarrito();
  actualizarContadorFavoritos();
  setupEventos();
});
