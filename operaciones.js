import { menu } from "./menu.js";


export function buscarPlato(nombre) {
    return menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

export function filtrarStockBajo(limite) {
    return menu.filter(p => p.stock <= limite);
}


export function venderPlato(nombre, cantidad = 1) {

    const plato = buscarPlato(nombre);

    if (!plato) {
        return { ok: false, mensaje: "Plato no encontrado" };
    }

    if (plato.stock < cantidad) {
        return { ok: false, mensaje: "Stock insuficiente" };
    }

    plato.stock -= cantidad;

    return {
        ok: true,
        mensaje: `Venta realizada: ${plato.nombre} x${cantidad}`
    };
}

export function verificarEstadoGeneral() {

    let agotados = menu.filter(p => p.stock === 0).length;

    if (agotados > 0) {
        return "Hay platos agotados";
    }

    let bajos = menu.filter(p => p.stock <= 3 && p.stock > 0).length;

    if (bajos > 0) {
        return "Hay platos con stock bajo";
    }

    return "Todo disponible";
}

export function contarPlatos() {
    return menu.length;
}
