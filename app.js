let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=c38df950508685c21f65364e0970650f&language=es-MX&page=${pagina}`
    );
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = " ";
      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          <h3 class ="titulo">${pelicula.title}</h3>
          </div>
          `;
      });
      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.error("Pusiste mal el nombre");
    } else if (respuesta.status === 404) {
      console.error("La pelicula no exite");
    } else {
      console.error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
