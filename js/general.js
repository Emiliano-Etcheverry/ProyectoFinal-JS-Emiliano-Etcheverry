const stock = []

function saveCarrito() {
        localStorage.setItem('ProductosSeleccionados', JSON.stringify(carrito))
}

function savedCarrito() {
    return JSON.parse(localStorage.getItem('ProductosSeleccionados')) || []
}

const carrito = savedCarrito()