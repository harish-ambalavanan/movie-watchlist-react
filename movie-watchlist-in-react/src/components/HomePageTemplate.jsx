import '../App.css'
import { useState } from 'react';
import HomePageLogic from './HomePageLogic'



function HomePageTemplate(){
    const [movieSearch, setMovieSearch] = useState("");
    // const [movieFound, setMovieFound] = useState(false)
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [movies, setMovies] = useState([])
    const apiKey = "f793ce55"
    // console.log(movies)

    function fetchMovies(searchedMovie){
        console.log("searchedMovie: " + searchedMovie)
        fetch(`https://www.omdbapi.com/?s=${searchedMovie}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if(data.Response === 'True'){
                    return Promise.all(data.Search.map(movie => fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)))
                }
                return []
            })
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(requiredMovieData => {
                setMovies(requiredMovieData)
                setSearchPerformed(true)
            })
    }

    return(
        <>
            <section className="hero">
                <div className="container flex">
                    <h1>Find your film</h1>
                    {/* <a href="watchlist.html" id="watch-list">My Watchlist</a> */}
                </div>
            </section>
            <section className="middle">
                <div className="container">
                    <div className="search-bar">                    
                        <input type="text" id= "movie-search-input" placeholder="Search for a movie" onChange={(event)=>{setMovieSearch(event.target.value)}}/>
                        <button className="btn" id="search-button" onClick={() => fetchMovies(movieSearch)}>Search</button>
                    </div>
                    <div className="center main-flex" id="movie-list"> 
                        {searchPerformed || <p id="center-quote-homepage">Start Exploring</p>}

                        {searchPerformed && movies.length === 0 && (
                            <p id="not-found">Unable to find what you’re looking for. Please try another search.</p>
                        )}

                        <div id="loading-container" className="hidden loading-container">
                            <p>Searching</p>
                            <div className="loading-spinner"></div>
                        </div>
    
                        <div className="movie-list" id="movie-list-container">
                            <HomePageLogic movies={movies}/>
                        </div>
                    </div>
                </div>
            </section>    
        </>
    )    
}

export default HomePageTemplate