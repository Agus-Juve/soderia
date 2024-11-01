document.querySelector('.contact__form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Capturar los datos de los campos del formulario
    const nombre = document.getElementById('contact-name').value;
    const telefono = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;
    const mensaje = document.getElementById('contact-message').value;

    // Crear el mensaje de alerta con los datos
    const alertaMensaje =`Nombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\nMensaje: ${mensaje}`;

    // Mostrar la alerta
    alert(alertaMensaje);
});
