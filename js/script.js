const nuevoalimento = document.getElementById("nuevoalimento");
const list = document.getElementById("list");
const btnaniadir = document.getElementById("btnaniadir");
const btncomprar = document.getElementById("btncomprar");
const error = document.getElementById("error");
const total = document.getElementById("total");

// Lista para almacenar los precios de cada elemento
let precios = [];

function comprobar() {
    var nuevoalimentoValor = nuevoalimento.value;

    if (nuevoalimentoValor === "") {
        error.textContent = "Introduzca un producto";
    } else {
        error.textContent = "";
        añadiralimento(); 
        nuevoalimento.value = ""; 
    }
}

function añadiralimento() {
    const nuevoalimentovalor = nuevoalimento.value;

    // Crear un nuevo elemento de lista
    const nuevoelemento = document.createElement("LI");
    nuevoelemento.className = "listitem";
    
    // Generar un precio aleatorio y almacenarlo
    let random = Math.floor(Math.random() * 30) + 1;
    precios.push(random);

    // Agregar el nuevo elemento a la lista
    list.appendChild(nuevoelemento);

    // Crear elementos adicionales dentro del nuevo elemento de lista
    const nombreElemento = document.createElement("SPAN");
    nombreElemento.className = "listitem__name";
    nombreElemento.textContent = nuevoalimentovalor;

    const precioElemento = document.createElement("SPAN");
    precioElemento.className = "listitem__price";
    precioElemento.textContent = random + "€";

    const btnAdd = document.createElement("BUTTON");
    btnAdd.className = "listbtn__add";
    btnAdd.textContent = "+";

    const btnDecrease = document.createElement("BUTTON");
    btnDecrease.className = "listbtn__decrease";
    btnDecrease.textContent = "-";

    const cantidadElemento = document.createElement("SPAN");
    cantidadElemento.className = "listitem__amount";
    cantidadElemento.textContent = cantidad;

    const btnDelete = document.createElement("BUTTON");
    btnDelete.className = "listbtn__delete";
    btnDelete.textContent = "X";

    // Agregar los elementos al nuevo elemento de lista
    nuevoelemento.appendChild(nombreElemento);
    nuevoelemento.appendChild(precioElemento);
    nuevoelemento.appendChild(btnAdd);
    nuevoelemento.appendChild(btnDecrease);
    nuevoelemento.appendChild(cantidadElemento);
    nuevoelemento.appendChild(btnDelete);

    // Agregar el índice a los datos del elemento
    nuevoelemento.dataset.index = precios.length - 1;

    preciototal();
}


btnaniadir.addEventListener("click", comprobar);

let cantidad = 1;

function funcionalidadbotones(event) {
    // Obtener la cantidad actual del elemento clicado
    const cantidadElemento = event.target.closest('.listitem').querySelector('.listitem__amount');

    if (event.target.nodeName === "BUTTON" && event.target.textContent === "+") {
        cantidad++;
        cantidadElemento.textContent = cantidad;
        
        let precioElemento = event.target.closest('.listitem').querySelector('.listitem__price');
        let nuevoPrecio = parseInt(precioElemento.textContent) * 2;
        precioElemento.textContent = nuevoPrecio + "€";
        
        
        let index = event.target.closest('.listitem').dataset.index;
        precios[index] = nuevoPrecio;
    
        preciototal();
        
    }

    if (event.target.nodeName === "BUTTON" && event.target.textContent === "-" && cantidad > 1) {
        cantidad--;
        cantidadElemento.textContent = cantidad;

        let precioElemento = event.target.closest('.listitem').querySelector('.listitem__price');
        let nuevoPrecio = parseInt(precioElemento.textContent) / 2;
        precioElemento.textContent = nuevoPrecio + "€";
        
        
        let index = event.target.closest('.listitem').dataset.index;
        precios[index] = nuevoPrecio;
    
        preciototal();
    }

    if (event.target.nodeName === 'BUTTON' && event.target.textContent === 'X') {
        const elementolista = event.target.closest('.listitem');
        if (elementolista) {
            
            precios.splice(elementolista.dataset.index, 1);
            elementolista.remove();
            
            preciototal();
        }
    }
}

list.addEventListener("click", funcionalidadbotones);

function preciototal() {
    
    
    const totalPrecio = precios.reduce((total, precio) => total + precio, 0);
    total.textContent = totalPrecio;   
}

function realizarCompraFINAL() {
    
    precios = [];
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    nuevoalimento.value = "";
    
    preciototal();
}

btncomprar.addEventListener("click", realizarCompraFINAL);
