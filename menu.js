export let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 }
];

export function obtenerMenu() {
    return menu;
}

export function agregarPlato(nombre, precio, stock) {

    let nuevoPlato = {
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    menu.push(nuevoPlato);
}

export function actualizarStock(nombre, nuevostock) {

    let plato = menu.find(p => p.nombre === nombre);
    s
    if (plato) {
        plato.stock = nuevostock;
    }

}

