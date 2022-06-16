const topUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const topDiv = document.querySelector("#topRated")

async function topRatedFetch(){
    const content = await fetch(topUrl).catch(err => console.log(err))
    const data = await content.json()
    if(data){
        topRatedHtml(data.results)
    }
}

function topRatedHtml(data){
    data.forEach(movie => {
        const movieDiv = document.createElement("div")
        movieDiv.classList.add("col-lg-3", "col-md-6", "col-12", "cursor-pointer", "hover-bigger", "max-width-100", "click-info")
        const output = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid border-radius">
        <h5 class="p-3 silver-border">${movie.title}</h5>
        <p class="lead"><span class="fw-bold">Rating:</span> <span class="rating">${movie.vote_average}</span>/10</p>
        `
        movieDiv.innerHTML = output
        topDiv.append(movieDiv)
        movieDiv.value = movie.id
    })
    document.querySelectorAll(".rating").forEach(rating => {
        rating.style.color = "lime"
        if(rating.innerHTML < 5){
            rating.style.color = "orange"
        }
        if(rating.innerHTML < 3){
            rating.style.color = "red"
        }
    })
    data.forEach(movie => {
        document.querySelectorAll(".click-info").forEach(div => {
            if(movie.id === div.value){
                div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview, movie.vote_average, movie.original_title, movie.id)})
        }})
        })
}

topRatedFetch()