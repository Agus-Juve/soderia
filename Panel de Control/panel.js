// panel.js

// Función para mostrar secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Gestión de Clientes
const formClientes = document.getElementById('formClientes');
const tablaClientes = document.getElementById('tablaClientes').querySelector('tbody');
const selectClientes = document.getElementById('pedidoCliente');

formClientes.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('clienteNombre').value;
    const direccion = document.getElementById('clienteDireccion').value;
    const observaciones = document.getElementById('clienteObservaciones').value;
    const telefono = document.getElementById('clienteTelefono').value;
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${direccion}</td>
        <td>${observaciones}</td>
        <td>${telefono}</td>
        <td>
            <button class="eliminar" onclick="eliminarFila(this)">Eliminar</button>
            <button class="editar" onclick="editarFila(this)">Editar</button>
        </td>
    `;

    tablaClientes.appendChild(fila);

    // Añadir cliente al select de pedidos
    const option = document.createElement('option');
    option.value = nombre;
    option.textContent = nombre;
    selectClientes.appendChild(option);

    formClientes.reset();
});

// Función para editar filas de clientes
function editarFila(boton) {
    const fila = boton.parentNode.parentNode;
    const columnas = fila.querySelectorAll('td');
    const nombre = columnas[0].textContent;
    const direccion = columnas[1].textContent;
    const observaciones = columnas[2].textContent;
    const telefono = columnas[3].textContent;

    document.getElementById('clienteNombre').value = nombre;
    document.getElementById('clienteDireccion').value = direccion;
    document.getElementById('clienteObservaciones').value = observaciones;
    document.getElementById('clienteTelefono').value = telefono;

    eliminarFila(boton);
}

// Gestión de Pedidos
const formPedidos = document.getElementById('formPedidos');
const tablaPedidos = document.getElementById('tablaPedidos').querySelector('tbody');

formPedidos.addEventListener('submit', function (event) {
    event.preventDefault();
    const cliente = document.getElementById('pedidoCliente').value;
    const nombre = document.getElementById('pedidoNombre').value;
    const cantidad = document.getElementById('pedidoCantidad').value;
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${cliente}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td><button class="eliminar" onclick="eliminarFila(this)">Eliminar</button></td>
    `;

    tablaPedidos.appendChild(fila);
    formPedidos.reset();
});

// Gestión de Recorridos
const formRecorridos = document.getElementById('formRecorridos');
const tablaRecorridos = document.getElementById('tablaRecorridos').querySelector('tbody');

formRecorridos.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('recorridoNombre').value;
    const pedido = document.getElementById('recorridoPedido').value;
    const distancia = document.getElementById('recorridoDistancia').value;
    const tiempo = document.getElementById('recorridoTiempo').value;
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${pedido}</td>
        <td>${distancia} km</td>
        <td>${tiempo}</td>
        <td><button class="eliminar" onclick="eliminarFila(this)">Eliminar</button></td>
    `;

    tablaRecorridos.appendChild(fila);
    formRecorridos.reset();
});

// Función para eliminar filas
function eliminarFila(boton) {
    const fila = boton.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}
