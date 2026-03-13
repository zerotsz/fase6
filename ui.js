import { menu, agregarPlato } from "./menu.js";
import {
    buscarPlato,
    filtrarStockBajo,
    venderPlato,
    verificarEstadoGeneral
} from "./operaciones.js";


export function renderMenu() {

    const output = document.getElementById("output");

    let html = "<h3>Menú</h3><ul>";

    for (let i = 0; i < menu.length; i++) {

        const plato = menu[i];

        let estado;

        if (plato.stock === 0) {
            estado = "Agotado";
        } else if (plato.stock <= 3) {
            estado = "Stock bajo";
        } else {
            estado = "Disponible";
        }

        html += `
        <li>
        ${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock} (${estado})
        </li>
        `;
    }

    html += "</ul>";

    html += `<h3>Estado del menú</h3>
    <p>${verificarEstadoGeneral()}</p>`;

    output.innerHTML = html;
}


export function renderLista(titulo, lista) {

    const output = document.getElementById("output");

    let html = `<h3>${titulo}</h3><ul>`;

    for (let i = 0; i < lista.length; i++) {
        html += `<li>${lista[i]}</li>`;
    }

    html += "</ul>";

    output.innerHTML = html;
}


export function mostrarMensaje(texto) {

    const output = document.getElementById("output");

    output.innerHTML = `<p>${texto}</p>`;
}


export function conectarEventos() {

    const btnMostrar = document.getElementById("btnMostrar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnStockBajo = document.getElementById("btnStockBajo");
    const btnVender = document.getElementById("btnVender");

    const inputBuscar = document.getElementById("inputBuscar");
    const inputVender = document.getElementById("inputVender");


    if (btnMostrar) {
        btnMostrar.addEventListener("click", renderMenu);
    }


    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {

            agregarPlato("Ceviche", 20, 4);

            renderMenu();

        });
    }


    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {

            const nombre = inputBuscar.value.trim();

            if (!nombre) {
                mostrarMensaje("Escribe un plato");
                return;
            }

            const plato = buscarPlato(nombre);

            if (!plato) {
                mostrarMensaje("No encontrado");
                return;
            }

            renderLista("Resultado", [
                `${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}`
            ]);

        });
    }


    if (btnStockBajo) {
        btnStockBajo.addEventListener("click", () => {

            const lista = filtrarStockBajo(3)
                .map(p => `${p.nombre} - Stock: ${p.stock}`);

            renderLista("Stock bajo", lista);

        });
    }


    if (btnVender) {
        btnVender.addEventListener("click", () => {

            const nombre = inputVender.value.trim();

            if (!nombre) {
                mostrarMensaje("Escribe el plato a vender");
                return;
            }

            const resultado = venderPlato(nombre);

            mostrarMensaje(resultado.mensaje);

            renderMenu();

        });
    }

}
