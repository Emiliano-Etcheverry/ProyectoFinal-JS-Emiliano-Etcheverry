function bienvenida() {
    
    console.log('Bienvenido a Tecno Shop')
    let opcion = prompt('1 - Si deseas ver nuestro catalogo completo\n2 - Si quieres buscar en una seccion especifica')
    console.log('Seleccionaste la opcion: ' + opcion)
    verCatalogo(opcion)  
}

function verCatalogo (ver){
    if (parseInt(ver) === 1){
        for (let i = 1; i <= 7; i++) {
            console.log(i + ". ")
            mostrarTipos(i)        
        }
    }
    else if (parseInt(ver) === 2) {
        let codigo = prompt('Elige el tipo de producto que deseas ver: ')
        console.log('Catalogo de los productos numero: ' + codigo)
        mostrarTipos(codigo)
    }
    else {
        console.warn('Opcion incorrecta. Intenelo nuevamente')
        bienvenida()
    }
}

function mostrarTipos(tipo) {
    switch (parseInt(tipo)) {
        case 1:
           for (let i = 1; i <= 5; i++) {
            console.log(i + '* ' + buscarEnStock(i).name)
           }
        break;
        case 2:
            for (let i = 6; i <= 10; i++) {
                console.log(i + '* ' + buscarEnStock(i).name)
               }
        break;
        case 3:
            for (let i = 11; i <= 15; i++) {
                console.log(i + '* ' + buscarEnStock(i).name)
               }
        break;
        case 4:
            for (let i = 16; i <= 20; i++) {
                console.log(i + '* ' + buscarEnStock(i).name)
               }
        break;
        case 5:
            for (let i = 21; i <= 25; i++) {
                console.log(i + '* ' + buscarEnStock(i).name)
               }
        break;
        case 6:
            for (let i = 26; i <= 30; i++) {
                console.log(i + '* ' + buscarEnStock(i).name)
               }
        break;
        case 7:
            for (let i = 31; i <= 35; i++) {
                console.log(i + '* ' + buscarEnStock(i).name)
               }
        break;
        
        default:
            console.warn('Ocurrio un error durante su seleccion')
    }    

}

function buscarEnStock(code) { 
    let result = stock.find((producto)=> producto.code === parseInt(code))
    return result 
}

function comenzarCompra() {
    let code = prompt('Ingrese el codigo de un producto para agregarlo al carrito')
    let productoSelecionado = buscarEnStock(code)
    if (productoSelecionado !== undefined) {
        carrito.push(productoSelecionado)
        alert(productoSelecionado.name + ' fue agregado al carrito.')
        let seguir = confirm('Continuar comprando?')
        if (seguir === true) {
            comenzarCompra()
        }
        else {
            console.table(carrito)
            terminarSeleccion()
        }
    }
    else {
        alert('Codigo no identificado\n Ingresa el codigo del producto que desees agregar al carrito')
        comenzarCompra()
    }
}

function terminarSeleccion() {
    const carro = new Compra(carrito)
    alert('El costo total de su compra es: $' + carro.obtenerTotal().toFixed(2) + ' USD')
}

/* Nuevo codigo para la tercer preEntrega */

const tProductos = document.querySelector('.tablaMercaderia')
const inputBuscar = document.querySelector('#inputSearch')
const categoria = document.querySelector('.categorias')
const feed = document.querySelector('div.feedback')
const URL = 'js/stock.json'

function crearColHTML(mercaderia) {
    return `<div class="botonProducto">
                <div class="card">
                    <div class="imagen">
                        <button id = "${mercaderia.code}" class="botonCarrito">  
                            🛒
                        </button>
                        <img src="img/${mercaderia.img}.webp" alt="">
                    </div>
                    <div class="productName" id="${mercaderia.clase}">
                        <p>${mercaderia.name}</p>
                    </div>
                    <div class="precio">
                        <p>$${mercaderia.price} USD</p>
                    </div>
                </div>
            </div>`
}

function cargarMercaderia(arreglo) {
    tProductos.innerHTML = ""
    if (arreglo.length > 0) {
        arreglo.forEach((mercaderia)=> tProductos.innerHTML += crearColHTML(mercaderia))
        feed.textContent = "Mercaderia en stock"
        buttonCarritoOn()
        buttonCategoriasOn()
    } else {
        feed.textContent = "No hay productos en stock"
    }
}

function buttonCategoriasOn() {
    const botonCategoria = document.querySelectorAll('button.button-categorias')
    botonCategoria.forEach((boton)=> {
        boton.addEventListener("click", ()=> {
            let catalogo = stock.filter((categoria)=> categoria.clase === boton.id)
            cargarMercaderia(catalogo)
            feed.textContent = "Catalogo de " + boton.id
        })
    })
}

function buttonCarritoOn() {
    const botonCarrito = document.querySelectorAll('button.botonCarrito')
    botonCarrito.forEach((boton)=> {
        boton.addEventListener("click", ()=> {
            let mercaderia = stock.find((prod)=> prod.code === parseInt(boton.id))
            carrito.push(mercaderia)
            feed.textContent = mercaderia.name + " fue agregado a tu carrito"
            saveCarrito()   
        })
    })
    
}

inputBuscar.addEventListener("search", ()=> {
    if (inputBuscar.value.trim() !== "") { 
        let arrayResultante = stock.filter((producto)=> producto.name.toLowerCase().includes(inputBuscar.value.trim().toLowerCase()))
        cargarMercaderia(arrayResultante)
        feed.textContent = "Resultados de la busqueda: " + inputBuscar.value
    }
})

function obtenerStock() {
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> stock.push(...data))
    .then(()=> cargarMercaderia(stock))
    // .catch((error)=> container.innerHTML = retornarCardError())
}

obtenerStock()