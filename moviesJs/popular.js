const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const popularDiv = document.querySelector("#popularDiv")

async function PopularMoviesFetch(){
    const content = await fetch(baseUrl).catch(err => console.log(err))
    const data = await content.json()
    if(data){
        HtmlDisplay(data.results)
    }
}

function HtmlDisplay(data){
    data.forEach(movie => {
        const div = document.createElement("div")
        div.classList.add("col-lg-3", "col-md-6", "col-12", "cursor-pointer", "hover-bigger", "max-width-100", "click-info")
        const output = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid border-radius">
        <h5 class="p-3 silver-border">${movie.title}</h5>
        <p class="lead"><span class="fw-bold">Rating:</span>
        <span class="rating">${movie.vote_average}</span>/10</p>
        `
        popularDiv.append(div)
        div.innerHTML = output
        div.value = movie.id
    })
    data.forEach(movie => {
    document.querySelectorAll(".click-info").forEach(div => {
        if(movie.id === div.value){
            div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview, movie.vote_average, movie.original_title, movie.id)})
    }})
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
}

async function getTrailer(id){
    const json = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US`).catch(err => console.log(err))
    if(json){
        const data = await json.json()
    if(data){
        const trailer = data.results.filter(video => {
            if(video.type === "Trailer"){
                return video
            }
        })
        return trailer
    }
    }
}

async function infoModel(title, background, overview, vote_average, original_title, id){
    const modal = document.querySelector("#viewModel")
    const video = await getTrailer(id)
    modal.innerHTML = `
    <div class="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center position-fixed-center z-9998 darker-background click-leave text-light">
    <div class="w-90 h-60 text-center dark-background-poster border-radius position-relative z-9999">
    <button class="position-absolute tl-0 button-close "><i class="bi bi-x h1"></i></button>
    <div class="overflow-y-scroll scroll-transparent height-100">
    <div class="container  iframe-place">
    <h1 class="p-5">${title}</h1>
    <p class="lead p-5">${overview}</p>
    <p class="lead"><span class="fw-bold">Original Title:</span> ${original_title}</p>
    <p class="lead"><span class="fw-bold">Rating:</span> <span class="rating">${vote_average}</span>/10</p>
    </div>
    </div>
    </div>
    </div>
    `
    document.querySelectorAll(".rating").forEach(rating => {
        rating.style.color = "lime"
        if(rating.innerHTML < 5){
            rating.style.color = "orange"
        }
        if(rating.innerHTML < 3){
            rating.style.color = "red"
        }
    })
    const iframeDiv = document.querySelector(".iframe-place")
    const iframe = document.createElement("iframe")
    if(video[0]){
        iframe.src = `https://www.youtube.com/embed/${video[0].key}`
        iframe.classList.add("iframe-display")
        iframe.frameborder = "0"
        iframe.allowfullscreen = "true"
        iframe.autoplay = "true"
        iframeDiv.append(iframe)
    }
    const closeDiv = document.querySelector(".click-leave")
    closeDiv.addEventListener("click", (event) => {
        if(event.target.parentElement === modal){
            modal.innerHTML = ""
        }
    })
    const infoDiv = document.querySelector(".dark-background-poster")
    infoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(https://image.tmdb.org/t/p/w500/${background})`
    infoDiv.style.backgroundSize = "cover"
    infoDiv.style.backgroundPosition = "center"
    document.querySelector(".button-close").addEventListener("click", () => modal.innerHTML = "")
    if(!background){
        infoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(/images/no-background.jpg)`
        infoDiv.style.backgroundSize = "cover"
    }
}

function infoModelPerson(name, background, profession, popularity, known_for){
    const modal = document.querySelector("#viewModel")
    modal.innerHTML = `
    <div class="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center position-fixed-center z-9998 darker-background click-leave text-light">
    <div class="w-90 h-60 text-center dark-background-poster border-radius position-relative z-9999">
    <button class="position-absolute tl-0 button-close "><i class="bi bi-x h1"></i></button>
    <div class="overflow-y-scroll scroll-transparent height-100">
    <div class="container">
    <h1 class="p-5">${name}</h1>
    <div class="known-for d-flex scroll-right-person py-3 text-center"></div>
    <p class="lead pt-3"><span class="fw-bold">Profession:</span> ${profession}</p>
    <p class="lead"><span class="fw-bold">popularity:</span> ${popularity}</p>
    <p></p>
    </div>
    </div>
    </div>
    </div>
    `
    const closeDiv = document.querySelector(".click-leave")
    closeDiv.addEventListener("click", (event) => {
        if(event.target.parentElement === modal){
            modal.innerHTML = ""
        }
    })
    const knownDiv = document.querySelector(".known-for")
    HtmlSetup(known_for, knownDiv)
    const infoDiv = document.querySelector(".dark-background-poster")
    infoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(https://image.tmdb.org/t/p/w500/${background})`
    infoDiv.style.backgroundSize = "cover"
    infoDiv.style.backgroundPosition = "center"
    document.querySelector(".button-close").addEventListener("click", () => modal.innerHTML = "")
    if(!background){
        infoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(/images/no-background.jpg)`
        infoDiv.style.backgroundSize = "cover"
    }
}


PopularMoviesFetch()