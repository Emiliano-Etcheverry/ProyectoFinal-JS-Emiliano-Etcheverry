const tCarrito = document.querySelector('.tablaCarrito')
const inputBuscar = document.querySelector('#inputSearch')
const feed = document.querySelector('div.feedback')
const total = document.querySelector('.pago')
const btnComprar = document.querySelector('.botonComprar')

function crearCarritoHTML(mercaderia) {
    return `<tr>
                <td class = "image"><img src="img/${mercaderia.img}.webp" alt=""></td>            
                <td class = "productName"><p>${mercaderia.name}</p></td>
                <td class = "productPrice">USD ${mercaderia.price}</td>
                <td class = "remove-button" id = "${mercaderia.code}" title ="Quitar del Carrito">✖️</td>
            </tr>`
}

function activarRemoveCarrito() { 
    const botonRemove = document.querySelectorAll('td.remove-button')
    botonRemove.forEach((botonQuitar) => {
        botonQuitar.addEventListener('click', ()=> {
            let codigo = parseInt(botonQuitar.id)
            let indice = carrito.findIndex((producto)=> producto.code === codigo)
            carrito.splice(indice, 1)
            feed.textContent = "Eliminado del carrito"
            mostrarCarrito() 
            saveCarrito()
    
        })
    })
}

function mostrarCarrito(stock) {
    tCarrito.innerHTML = ''
    if (carrito.length > 0) {
        carrito.forEach((producto)=> tCarrito.innerHTML += crearCarritoHTML(producto)) 
        activarRemoveCarrito() 
        mostrarTotal()
    } else {
        feed.textContent = "Su carrito esta vacio"
    }   
}

function calcularTotal() {
    return carrito.reduce((acc, producto)=> acc + producto.price, 0)
}


function mostrarTotal() {
    total.innerText = "Importe total: USD " + calcularTotal()
}

mostrarCarrito()

btnComprar.addEventListener('click', ()=> {
    Swal.fire({
        title: '¿Confirmar la compra?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'CONFIRMAR',
        denyButtonText: 'CANCELAR'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('ProductosSeleccionados')
            carrito.length = 0
            Swal.fire('Compra realizada con exito!', '', 'info')
            mostrarCarrito()
            mostrarTotal()
        }
    })
})

