import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Card from "./card";
import movieService from "../services/movieService";

const arr = ["Popular", "Theatre", "Kids", "Drama", "Comedy"];

const Navbar = () => {
    const [moviess, setMovies] = useState([]);
    const [selectedMovieType, setSelectedMovieType] = useState("Popular");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await movieService.getData(selectedMovieType);
                setMovies(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };

        fetchData();

    }, [selectedMovieType]);

    const searchMovie = async () => {
        try {
            console.log('search====>', search);
            if (search.trim() !== "") {
                const data = await movieService.searchData(search);
                setSearchResults(data); 
            } else {
                setSearchResults([]);
            }
        } catch (err) {
            console.log('Error fetching search data:', err);
        }
    };

    const handleSearchButton = (e) => {
        e.preventDefault();
        searchMovie();
    };

    return (
        <>
            <div className={styles.header}>
                <nav>
                    <ul>
                        {arr.map((value) => (
                            <li key={value}>
                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedMovieType(value); }}>
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <form>
                    <div className={styles["search-btn"]}>
                        <input
                            type="text"
                            placeholder="Enter Movie Name"
                            className={styles.inputText}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyUp={searchMovie}
                        />
                        <button type="button" onClick={handleSearchButton}>
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="container">
                <Card moviess={searchResults.length > 0 ? searchResults : moviess} /> 
            </div>
        </>
    );
};
export default Navbar;







