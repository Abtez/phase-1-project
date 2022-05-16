const api = '34a9687dacfd65f1330027e3c4a8bbed'
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=34a9687dacfd65f1330027e3c4a8bbed&language=en-US&sort_by=popularity.desc&page=1'
let data = ''

document.addEventListener('DOMContentLoaded', () => {
    getMovies()
})

function getMovies(){
    fetch(url).then(res => res.json())
    .then(movies => {
        const results = movies.results
        results.forEach(movie => {
            singleMovie(movie)
        });
    })
}

function singleMovie(movie){
    let overview = movie.overview.substring(0, 120)
    let title = movie.title.substring(0, 20)
    data += `
    <div class="movie-card" id="poster" style="background-image: url( 'https://image.tmdb.org/t/p/original${movie.poster_path}' );">
    <div class="movie-card__overlay"></div>                    
    <div class="movie-card__content">
        <div class="movie-card__header">
        <h1 class="movie-card__title">${title}</h1>
        <h4 class="movie-card__info">Released (${movie.release_date}), Vote Average ${movie.vote_average}</h4>
        </div>
        <p class="movie-card__desc">${overview}</p>
        <button class="btn btn-outline movie-card__button" type="button"> ${movie.vote_count} Likes</button>
    </div>
    </div>
    `
    document.getElementById('home').innerHTML = data
}








