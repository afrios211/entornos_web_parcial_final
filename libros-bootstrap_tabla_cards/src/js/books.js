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

//ingresar datos en la tabla y mostrarlos en html
function mostrarLibros(listLibros) {
    let datosLibrosFila = document.getElementById("tableBody");
    let libros = "";
    for (var contador = 0; contador < listLibros.length; contador++) {
        let datosFila = `<tr>
                            <td> ${listLibros[contador].id} </td>
                            <td> ${listLibros[contador].title} </td>
                            <td> ${listLibros[contador].genre} </td>
                            <td> ${listLibros[contador].author} </td>
                            <td> ${listLibros[contador].precio} </td>
                            <td> ${listLibros[contador].numeroPaginas} </td>
                            <td> ${listLibros[contador].estado} </td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="obtenerLibroEliminar('${listLibros[contador].id}', '${listLibros[contador].title}')"><i class="bi bi-trash"></i></button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal" onclick="obtenerLibroAEditar('${listLibros[contador].id}'); datosActuales('${listLibros[contador].title}', '${listLibros[contador].genre}', '${listLibros[contador].author}', '${listLibros[contador].url}', ' ${listLibros[contador].precio}', '${listLibros[contador].numeroPaginas}');"><i class="bi bi-pencil-square"></i></button>
                            </td>
                            <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detallesModal" onclick="obtenerLibroDetalles('${listLibros[contador].id}', '${listLibros[contador].title}', '${listLibros[contador].genre}', '${listLibros[contador].author}', '${listLibros[contador].precio}', '${listLibros[contador].numeroPaginas}', '${listLibros[contador].url}')">
                            DETALLES
                          </button>
                            </td>
                        </tr>`;
        // funcion para insertar la tabla en archivo html de acuardo al id
        libros += datosFila;
    }
    datosLibrosFila.innerHTML =libros
}

//----------------------------------------CREAR LIBRO----------------------------------------------------------------------------

const saveButton = document.getElementById('saveBookButton')
saveButton.addEventListener('click', crearLibros)

//funcion para capturar datos ingresados desde modal crear libro
function crearLibros() {
    let title = document.getElementById('name').value;
    let genre = document.getElementById('genre').value;
    let author = document.getElementById('author').value;
    let url =document.getElementById('url').value;
    let precio = document.getElementById('precio').value;
    let numeroPaginas = document.getElementById('numeroPaginas').value;
    let estado = document.getElementById('estadoCrear').checked
    console.log(estado)
    

    if (title === "" || genre === "" || author === "" || url === "" || precio === "" || numeroPaginas ===""){
        alert('todos los campos deben estar llenos')
    }

   else {

        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                title : title, 
                genre : genre, 
                author : author,
                url : url,
                precio : precio,
                numeroPaginas : numeroPaginas,
                estado : estado

                
               
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            cerrarModal('createModal')
            obtnerLibrosApi()
        })
    
        .catch(
            function (error) {
                console.log(error);
        });
    }   
}

//--------------------------------ELIMININAR LIBRO------------------------------------------------------------

let libroAEliminarId = "";
function obtenerLibroEliminar(id,titulo){
    libroAEliminarId = id;
    document.getElementById('eliminarLibroSpanId').innerHTML = id;
    document.getElementById('eliminarLibroSpanTitulo').innerHTML = titulo;
}

function eliminarLibro(){
   let id = libroAEliminarId;

    fetch('http://localhost:3000/books/'+ id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        cerrarModal('deleteModal');
        obtnerLibrosApi();
        alert(' Libro eliminado correctamente')
    })
  
     .catch(
        function (error) {
            alert('error al tratar de borrar el libro')
            console.log(error);
    });

}

//--------------------------------EDITAR LIBRO----------------------------------------------------

//funcion para obtener libro a editar
let libroAEditarId = "";
function obtenerLibroAEditar(id){
    libroAEditarId = id;
    console.log(libroAEditarId)
}
//funcion actualizar libro
function actualizarLibro(){
   let id = libroAEditarId;
    let title = document.getElementById('titulo2').value
    let genre = document.getElementById('genre2').value
    let author = document.getElementById('author2').value
    let url = document.getElementById('url2').value
    let precio = document.getElementById('precio2').value;
    let numeroPaginas = document.getElementById('numeroPaginas2').value;
    let estado = document.getElementById('estadoEditar').checked

    if (title === "" || genre === "" || author === "" || url === "" || precio === "" || numeroPaginas ===""){
        alert('todos los campos deben estar llenos')
    }


    else {
        fetch('http://localhost:3000/books/'+ id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                title : title, 
                genre : genre, 
                author : author,
                url : url,
                precio : precio,
                numeroPaginas : numeroPaginas,
                estado : estado

            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            cerrarModal('editModal');
            obtnerLibrosApi();
            alert('libro actualizado correctamente')
        })
        .catch(
            function (error) {
                console.log(error);
        });
    }   
}




//---------------------------------funciones--------------------------------------------------------
//funcion cerrar modal
function cerrarModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(existingModal);
    modal.hide();
}

//FUNCION RELLLENAR CAMPOS EDITAR CON DATOS ACTUALES
function datosActuales(title, genre, author, url,precio,numeroPaginas){
    document.getElementById('titulo2').value = title;
    document.getElementById('genre2').value = genre;
    document.getElementById('author2').value = author;
    document.getElementById('url2').value = url;
    document.getElementById('precio2').value = precio;
    document.getElementById('numeroPaginas2').value = numeroPaginas;


}

//funcion campos crear libro en blanco
function CamposEnBlanco(){
    var title =  document.getElementById('name');
    var author = document.getElementById('author');
    var genre =  document.getElementById('genre');
    var url =  document.getElementById('url');
    var precio = document.getElementById('precio');
    var numeroPaginas = document.getElementById('numeroPaginas');

    title.value = "";
    author.value = ""; 
    genre.value = "SELECCIONE OPCION";
    url.value = "";
    precio.value = "";
    numeroPaginas.value = "";

}

//funcion mostrar libro en card, boton detalles
function obtenerLibroDetalles(id,title,genre,author,precio,numeroPaginas,url){
    document.getElementById('detallesId').innerHTML = id;
    document.getElementById('detallesTitle').innerHTML = title;
    document.getElementById('detallesAutor').innerHTML = author;
    document.getElementById('detallesGenre').innerHTML = genre;
    document.getElementById('detallesPrecio').innerHTML = precio;
    document.getElementById('detallesNumeroPaginas').innerHTML = numeroPaginas;
    


}