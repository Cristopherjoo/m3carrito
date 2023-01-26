let productosCarro = [];

if (localStorage.getItem("productos")) {
  productosCarro = JSON.parse(localStorage.getItem("productos"));
  console.log(productosCarro);
  actualizarCarro(productosCarro);
}

cargarProductos(productos);

//FUNCION ENCARGADA DE CARGAR PRODUCTOS
function cargarProductos(listadoProductos) {
  let acumulador = "";
  
  listadoProductos.forEach((producto) => {
    let template = `<div class="col-12 col-md-6 col-lg-4">
                    <div class="card m-auto my-3" style="width: 18rem;">
                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                      <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>                      
                      <p class="card-text">Precio Normal: $ ${
                        producto.precio
                      }</p>
                      <p class="card-text text-danger">Descuento: -  $ ${
                        producto.descuento
                      }</p>
                      <p class="text-secondary-emphasis">Precio final: $ ${
                        producto.precio - producto.descuento
                      }</p>
                      <a class="btn btn-outline-danger" data-sku="${
                        producto.sku
                      }" onclick="addToCart('${producto.sku}')">Comprar</a>

                      <a class="btn btn-outline-dark" data-sku="${
                        producto.sku
                      }" onclick="mostrarModal('${producto.id}')">Descripcion</a>
                      </div>
                  </div>
              </div>
          `;
    acumulador += template;
  });

  document.querySelector("#productos .row").innerHTML = acumulador;
}

function mostrarModal(id) {
  let found = productos.find(producto => producto.id == id)
  const myModal = new bootstrap.Modal('#exampleModal')
  exampleModalLabel.innerText = found.nombre;
  myModal.show()

}

function addToCart(sku) {
  let objProducto = {
    sku,
    cantidad: 1,
  };

  let productoEncontrado = productosCarro.find(
    (producto) => producto.sku == sku
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
  } else {
    productosCarro.push(objProducto);
  }

  actualizarCarro(productosCarro);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado correctamente.",
    showConfirmButton: false,
    timer: 1500,
  });
}

function actualizarCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(listadoProductos));

  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    valorInicial
  );

  document.querySelector("#cantidad-productos").innerText = sumaProductos;
}
