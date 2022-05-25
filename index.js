
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=34a9687dacfd65f1330027e3c4a8bbed&language=en-US&sort_by=popularity.desc&page=1'
const commentUrl = 'http://localhost:3000/comments/'
const form = document.querySelector('form')
let movieData = ''
let commentData = ''


document.addEventListener('DOMContentLoaded', () => {
    getAll()
})

function getAll(){
    getMovies()
    getComments()
    submitComment()
}

function getMovies(){
    fetch(url).then(res => res.json())
    .then(result => {
        let movies = result.results
        movies.forEach(movie => {
            singleMovie(movie)
        });
    })  
}

function getComments(){
    fetch(commentUrl).then(res => res.json())
    .then(comments => {
        comments.forEach(comment => {
            singleComment(comment)
        });        
    })
}

function singleMovie(movie){
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
                <button id="like-btn" class="btn btn-outline movie-card__button" type="button"><span id="likes">${movie.vote_count}</span> Likes</button>

            </div>                    
    </div> 
    `
    const mainContent = document.getElementById('home')
    mainContent.innerHTML = movieData
}

function singleComment(comment){
    const likeBtn =  document.createElement('button')
    const editBtn =  document.createElement('button')
    const li = document.createElement('li')
    const span = document.createElement('span')
    const br = document.createElement('br')

    li.innerHTML = comment.content
    likeBtn.style.marginLeft = '5px'
    likeBtn.innerHTML = 'Like'
    likeBtn.style.backgroundColor = 'Lime'

    likeBtn.addEventListener('click', () => {
        like(comment);
        
    })

    editBtn.innerHTML = 'Edit'
    editBtn.style.backgroundColor = 'yellow'
    editBtn.style.marginLeft = '5px'

    editBtn.addEventListener('click', () => {
        editPost()
    })

    

    span.innerHTML = comment.likes + ' Likes'
    span.className = 'like'
    // commentData += `
    // <li>${comment.content} 
    // <button  id="likeBtn" style="background-color: lime;">Like</button> 
    // <button id="edit-btn" style="background-color: yellow;">Edit</button>
    // <br>
    // <span>
    //     <span class="like" id="like">${comment.likes} Likes</span>
    // </span>
    // </li>
    // `
    li.appendChild(likeBtn)
    li.appendChild(editBtn)
    li.append(br)
    li.append(span)
    
    const reviews = document.getElementById('reviews')
    reviews.appendChild(li)

}

function like(comment){
    comment.likes++
    updateLikes(comment)
}

function updateLikes(comment){
    fetch(commentUrl + `${comment.id}`, {method: 'PATCH', headers: {
        'content-type': 'application/json'
    }, body: JSON.stringify(comment)
  }).then(res => res.json()).then(comment => singleComment(comment))
}

function editPost(comment){
    let formData = form.feedback
    formData.value = comment.content
    console.log(formData);
}

function submitComment(){
    form.addEventListener('submit', event => {
        event.preventDefault()
        const content = form.feedback.value;
        const comment = {
            movie_id: Math.floor(Math.random() * 100000),
            content: content,
            likes: 0
        }
        postComment(comment)
    })
}

function postComment(comment){
    fetch(commentUrl, {method: 'POST', headers: {
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }, body: JSON.stringify(comment)
  }).then(res => res.json()).then(comment => singleComment(comment))
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




