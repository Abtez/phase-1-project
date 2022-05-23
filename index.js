
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=34a9687dacfd65f1330027e3c4a8bbed&language=en-US&sort_by=popularity.desc&page=1'
const commentUrl = 'http://localhost:3000/comments'
let movieData = ''
let commentData = []
let cmmnt = ''


document.addEventListener('DOMContentLoaded', () => {
    getAll()
})

function getAll(){
    getMovies()
    // getComments()
}

function getMovies(){
    fetch(commentUrl).then(res => res.json())
    .then(comments => {
        commentData = comments
    
    fetch(url).then(res => res.json())
    .then(result => {
        let movies = result.results
        singleMovie(movies, commentData)
    })
  })  
}

// function getComments(){
//     fetch(commentUrl).then(res => res.json())
//     .then(comments => {
//         comments.forEach(comment => {
//             commentData = comment
//             return commentData
//         });
        
//     })
// }

function singleMovie(movies, comments){
    movies.forEach(movie => {
        let title = movie.original_title.substring(0, 18);
        let overview = movie.overview.substring(0, 120);

        movieData += `
        <div class="movie-card" id="poster" style="background-image: url( 'https://image.tmdb.org/t/p/original${movie.poster_path}' );">
            <div class="movie-card__overlay"></div>                    
                <div class="movie-card__content">
                    <div class="movie-card__header">
                    <h2 id="title" class="movie-card__title">${title}...</h2>
                    <small id="released" class="movie-card__info">Released ${movie.release_date}</small>
                    </div>
                    <p id="overview" class="movie-card__desc">${overview}...</p>
                    <button oncli id="like-btn" class="btn btn-outline movie-card__button" type="button"><span id="likes">2</span> Likes</button>
                    <br>
                    <h4 style="text-decoration: underline; margin: 0;">Comments</h4>
                </div>                    
        </div> 
        `
        const mainContent = document.getElementById('home')
        mainContent.innerHTML = movieData
    });
    
    console.log("movie ", comments);

}

function submitComment(){
    const form = document.querySelector('form')
    form.addEventListener('submit',event => {
        event.preventDefault()
        const comment = form.comment.value;
        addComment(comment)
    })
}



















// data += `
    // <div class="movie-card" id="poster" style="background-image: url( 'https://image.tmdb.org/t/p/original${movie.poster_path}' );">
    // <div class="movie-card__overlay"></div>                    
    // <div class="movie-card__content">
    //     <div class="movie-card__header">
    //     <h1 class="movie-card__title">${title}</h1>
    //     <h4 class="movie-card__info">Released (${movie.release_date}), Vote Average ${movie.vote_average}</h4>
    //     </div>
    //     <p class="movie-card__desc">${overview}</p>
    //     <button id="likes" class="btn btn-outline movie-card__button" type="button"> ${movie.vote_count} Likes</button>
    // </div>
    // </div>
    // `
    // document.getElementById('home').innerHTML = data

    // const likeBtn  = document.getElementById('likes')
    // likeBtn.addEventListener('click', () => {
    //     alert(movie.vote_count)
    // })










    
// function getMovies(){
//     fetch(url).then(res => res.json())
//     .then(movies => {
//         const results = movies.results
//         movieArray = results
//         movieArray.forEach(movie => {
//             commentUrl
//             console.log(movie);
//         });
//         // console.log(movieArray);
//     })
// }

// function addComment(comment){
//     const comments = document.createElement('li')
//     comments.innerHTML = comment
    
//     document.getElementById('comment-list').appendChild(comments)
// }



