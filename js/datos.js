let body = document.getElementsByTagName("body")[0];

let section = crearElem("section");

body.appendChild(section);

let h1 = crearElemTexto("h1", "Usuarios");
let pagina = 1;

// Article debe ser creado fuera para cambiar conteidos más tarde.
let article = crearElem("article");

let usuarios = [];

let filtroBusqueda = crearElem("article");
let inputBusqueda = crearElem("input");
inputBusqueda.setAttribute("type", "text");
inputBusqueda.setAttribute("placeholder", "Buscar usuario...");
inputBusqueda.addEventListener("input", filtrarUsuarios);
filtroBusqueda.appendChild(inputBusqueda);

function cargarUsuarios() {
    fetch(`https://reqres.in/api/users?page=${pagina}`, {
            method: "GET",
            headers: {
                "x-api-key": "reqres_1167666ae9394e5b9a3978aa02d23ad2",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.data);

            // usuarios
            usuarios = data.data;
            generarUsuarios(usuarios);
        })
        .catch(error => {
            console.error("Error: ", error)
        });
}

cargarUsuarios();

function generarUsuarios(usuarios) {
    article.textContent = "";
    usuarios.forEach(usuario => {
        let tarjeta = crearTarjetas(usuario);
        tarjeta.setAttribute("class", "tarjeta");
        // tarjeta.classList.add("tarjeta");
        article.setAttribute("style", "display: grid;grid-template-columns: repeat(2,1fr);")
        article.appendChild(tarjeta);
    });

    section.appendChild(article);
}

function filtrarUsuarios() {
    // Recoger valor del input
    let texto = inputBusqueda.value.toLowerCase();

    let filtrados = usuarios.filter(
        usuario =>
            usuario.first_name.toLowerCase().includes(texto) ||
            usuario.last_name.toLowerCase().includes(texto) ||
            usuario.email.toLowerCase().includes(texto) 
    );

    generarUsuarios(filtrados);
}

let botones = crearElem("article");
let btnAnterior = crearElemTexto("button", "Anterior");
let btnSiguiente = crearElemTexto("button", "Siguiente");

btnAnterior.addEventListener("click", (e) => {
    if (pagina >= 2) {
        pagina--;
        cargarUsuarios();
    }
});

btnSiguiente.addEventListener("click", (e) => {
    if (pagina >= 1 && pagina < 2) {
        pagina++;
        cargarUsuarios();
    }
});

botones.append(btnAnterior, btnSiguiente, filtroBusqueda);

section.append(h1, botones);

function crearElem(tag) {
    let elem = document.createElement(tag);
    return elem;
}

function crearElemTexto(tag, txt) {
    let elem = document.createElement(tag);
    elem.textContent = txt;
    return elem;
}

function crearTarjetas(data) {
    let section = crearElem("section");
    let figure = crearElem("figure");
    let article = crearElem("article");
    article.setAttribute("style", "display: grid; align-content: space-evenly;")

    let img = document.createElement("img");
    img.setAttribute("src", `${data.avatar}`);
    img.setAttribute("alt", `${data.avatar}`);

    let p1 = crearElemTexto("p", data.first_name);
    let p2 = crearElemTexto("p", data.last_name);
    let p3 = crearElemTexto("p", data.email);

    article.append(p1, p2, p3);

    figure.appendChild(img);


    section.append(figure, article);
    return section;
}