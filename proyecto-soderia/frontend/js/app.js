document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const clienteLista = document.getElementById('clienteLista');
    let clienteIdEnEdicion = null; // Para controlar si estamos editando un cliente

    // Función para agregar o modificar cliente
    clienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const clienteData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            localidad: document.getElementById('localidad').value,
            calle: document.getElementById('calle').value,
            altura: document.getElementById('altura').value,
            piso: document.getElementById('piso').value,
            departamento: document.getElementById('departamento').value
        };

        try {
            let res;
            if (clienteIdEnEdicion) {
                // Editar cliente existente
                res = await fetch(`http://localhost:3000/clientes/${clienteIdEnEdicion}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(clienteData)
                });
                clienteIdEnEdicion = null; // Reiniciamos el cliente en edición
                alert('Cliente modificado con éxito');
            } else {
                // Agregar nuevo cliente
                res = await fetch('http://localhost:3000/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(clienteData)
                });
                alert('Cliente agregado con éxito');
            }

            if (res.ok) {
                cargarClientes(); // Actualizar la lista de clientes
            }

            // Limpiar el formulario
            clienteForm.reset();
        } catch (error) {
            console.error('Error al agregar o modificar cliente:', error);
        }
    });

    // Función para cargar los clientes desde el backend
    async function cargarClientes() {
        try {
            const res = await fetch('http://localhost:3000/clientes');
            const clientes = await res.json();

            clienteLista.innerHTML = ''; // Limpiar la tabla antes de cargar los clientes
            clientes.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.localidad}</td>
                    <td>${cliente.calle}</td>
                    <td>${cliente.altura}</td>
                    <td>${cliente.piso}</td>
                    <td>${cliente.departamento}</td>
                    <td>
                        <div class="btn-container">
                            <button onclick="editarCliente(${cliente.id})">Modificar</button>
                            <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                        </div>
                    </td>
                `;
                clienteLista.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    }

    // Función para eliminar clientes
    window.eliminarCliente = async function (id) {
        try {
            const res = await fetch(`http://localhost:3000/clientes/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert('Cliente eliminado');
                cargarClientes(); // Actualizar la lista de clientes después de eliminar uno
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    };

    // Función para editar clientes
    window.editarCliente = function (id) {
        // Guardar el ID del cliente en edición
        clienteIdEnEdicion = id;

        // Cargar los datos del cliente en el formulario
        fetch(`http://localhost:3000/clientes/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Cliente no encontrado');
                }
                return res.json();
            })
            .then(cliente => {
                document.getElementById('nombre').value = cliente.nombre;
                document.getElementById('apellido').value = cliente.apellido;
                document.getElementById('email').value = cliente.email;
                document.getElementById('localidad').value = cliente.localidad;
                document.getElementById('calle').value = cliente.calle;
                document.getElementById('altura').value = cliente.altura;
                document.getElementById('piso').value = cliente.piso;
                document.getElementById('departamento').value = cliente.departamento;
            })
            .catch(error => {
                console.error('Error al cargar el cliente:', error);
                alert('No se pudo cargar el cliente. Verifica que exista en la base de datos.');
            });
    };

    // Cargar clientes al cargar la página
    cargarClientes();
});
