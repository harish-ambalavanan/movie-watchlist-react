import React from "react";
import { useState } from 'react'
import { useEffect } from 'react'

function HomePageLogic(props){
    const { movies } = props
    return(
        movies.map(movie => {
            return <div className="individual-movie">
                <div className="image-div col1">
                    <img src={movie.Poster} alt=""/>
                </div>
                <div className="inner-flex col2">
                    <div className="movie-header">
                        <h2 id="movie-tile" className="movie-title">{movie.Title}</h2>
                        <i id="STAR-ICON" className=""></i>
                        <p id="ratings">{movie.imdbRating}</p>
                    </div>
        
                    <div className="movie-details">
                        <p id="movie-duration">{movie.Runtime}</p>
                        <p id="movie-genres">{movie.Genre}</p>
                        <p data-movie-id={movie.imdbID}>Watchlist</p>
                    </div>
        
                    <p id="movie-description">{movie.Plot}</p>
                </div>
            </div>                
        })
    )
}

export default HomePageLogic