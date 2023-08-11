const API_KEY = "f1d58bb0fdfbe92109a7b5861117a9b2";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('dataaaaaaaaaaaaaaaaaa', data);
        return data.results;
    } catch (err) {
        console.log("Error fetching data:", err);
        throw err;
    }
}

async function searchData(value) {
    try {
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${value}`;
        const data = await fetchData(url);
        return data;
    } catch (error) {
        console.error("Error fetching search data:", error);
        throw error;
    }
}

async function getData(movieType) {
    try {
        let url = '';
        if (movieType === "Popular") {
            url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
        } else if (movieType === "Theatre") {
            url = `${BASE_URL}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=${API_KEY}`;
        } else if (movieType === "Kids") {
            url = `${BASE_URL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_KEY}`;
        } else if (movieType === "Drama") {
            url = `${BASE_URL}/discover/movie?with_genres=18&primary_release_year=2014&api_key=${API_KEY}`;
        } else if (movieType === "Comedie") {
            url = `${BASE_URL}/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=${API_KEY}`;
        }

        if (url) {
            const data = await fetchData(url);
            return data;
        } else {
            console.log(`No data available for movie type: ${movieType}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const movieService = {
    fetchData,
    getData,
    searchData
};

export default movieService;
