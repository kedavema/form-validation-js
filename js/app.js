// Variables

const btnEnviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const form = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const btnReset = document.querySelector('#resetBtn');
const error = document.querySelector('p.error');



eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener( 'DOMContentLoaded', iniciarApp );

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    form.addEventListener('submit', enviarEmail );
    btnReset.addEventListener('click', resetForm);
}


// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed');
    btnEnviar.classList.add('opacity-50');
    
}

// Validación formulario
function validarFormulario(e) {
    const error = document.querySelector('p.error');
    if( e.target.value.length > 0 ) {
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {


        if (er.test( e.target.value )) {
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if ( er.test( email.value ) && asunto.value !== '' && mensaje.value !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed');
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.focus();
    } else {
        iniciarApp();
    }
}

function mostrarError(mensaje) {
    const mostrarMensaje = document.createElement('p');
    mostrarMensaje.textContent = mensaje;
    mostrarMensaje.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error')
    if(errores.length === 0) {
        form.appendChild(mostrarMensaje);
    }
}


function enviarEmail(e) {
    e.preventDefault();

    // Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {

        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El Email se ha enviado correctamente';
        parrafo.classList.add('border', 'border-green-500', 'bg-green-500','text-white', 'p-2', 'text-center', 'my-10', 'uppercase');
        form.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetForm();
        }, 5000);

    }, 3000);

}

function resetForm() {
    const error = document.querySelector('p.error');
    form.reset();
    iniciarApp();
    if (error){
    error.remove();
    }
    email.classList.remove('border-green-500', 'border-red-500');
    asunto.classList.remove('border-green-500', 'border-red-500');
    mensaje.classList.remove('border-green-500', 'border-red-500');
    email.focus();
}