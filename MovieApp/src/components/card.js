import React from "react";
import styles from "./card.module.css";

const Card = ({ moviess }) => {
    const img_path = 'http://image.tmdb.org/t/p/w500';
    return (
        <>
            {moviess.map(movie => (
                <div className={styles.movie} key={movie.id}>
                    {movie.poster_path ? (
                        <img src={img_path + movie.poster_path} alt={movie.title} className={styles.poster} />
                    ) : (
                        <div style={{ color: "white" }}>
                        No Poster Available
                         </div>
                    )}
                    <div className={styles["movie-details"]}>
                        <div className={styles.box}>
                            <h4 className={styles.title}>{movie.title}</h4>
                            <p className={styles.rating}>{movie.vote_average}</p>
                        </div>
                        <div className={styles.overview}>
                            <h1>Overview</h1>
                            {movie.overview}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}


export default Card;
