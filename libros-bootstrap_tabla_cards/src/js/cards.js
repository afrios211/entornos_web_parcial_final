//------------------------------MOSTRAR LIBRO CUARDADO EN LA API-----------------------------------
//escuchador de eventos
document.addEventListener('DOMContentLoaded', obtnerLibrosApi);

// traer los datos que se encuentran en la api
function obtnerLibrosApi() {
    fetch('http://localhost:3000/books')
        .then(Response => Response.json())
        .then(data => mostrarLibros(data))
        .catch(
            function (error) {
                console.log(error);
            });
}

//ingresar datos en el card y mostrarlos en html
function mostrarLibros(listLibros) {
    let datosLibrosFila = document.getElementById("cardBooks");
    let libros = "";
    for (var contador = 0; contador < listLibros.length; contador++) {

        if (listLibros[contador].estado == true) {

            let datosFila = `<div class="card mb-3 bg-dark-subtle border border-2 border-dark" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${listLibros[contador].url}" class="img-fluid rounded-start border border-2 border-dark " alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h6 class="card-title"> TITULO: ${listLibros[contador].title} </h6>
                                        <p class="card-text"> AUTOR:  ${listLibros[contador].author} </p>
                                        <p class="card-text"> GENERO:  ${listLibros[contador].genre} </p>
                                        <p class="card-text"> ID:  ${listLibros[contador].id} </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;


            // funcion para insertar la tabla en archivo html de acuardo al id
            libros += datosFila;
        }
    }
    datosLibrosFila.innerHTML = libros
}


