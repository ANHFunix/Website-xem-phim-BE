const fs = require('fs')
const path = require('path')
const Genre = require('./genreModel');

//lấy data từ file
const DATA_PATH = path.join(__dirname, '..','data','movieList.json');
module.exports = class MovieModel {


    static getAllMovies = () => {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    }

    static getMovieTrending = () => {
        const movies = this.getAllMovies();
        const movieTrending = movies.sort((a, b) => b.popularity - a.popularity);
        return movieTrending;
    }

    static getMovieTopRate = () => {
        const movies = this.getAllMovies();
        const sort = movies.sort((a, b) => b.vote_average - a.vote_average);
        return sort;
    }
    static getMovieByKeyword = (keyword) => {
        const listMovie = this.getAllMovies();
        const sort = listMovie.filter(
            (item) =>
                String(item.title)
                    .toLocaleLowerCase()
                    .includes(keyword.toLocaleLowerCase()) ||
                String(item.name)
                    .toLocaleLowerCase()
                    .includes(keyword.toLocaleLowerCase()) ||
                String(item.overview)
                    .toLocaleLowerCase()
                    .includes(keyword.toLocaleLowerCase())

        );
        return sort;
    }

    static getSearchMore = (keyword, mediaType, language, year, genre) => {
        let tasks = [];
        tasks = this.getMovieByKeyword(keyword);
        if (year) {
            tasks = tasks.filter(
                (movie) => {
                    return movie.release_date !== undefined ? new Date(movie.release_date).getFullYear() == year
                        : movie.first_air_date !== undefined ? new Date(movie.first_air_date).getFullYear() == year : true
                }
            );
        }
        if (mediaType) {
            tasks = tasks.filter(movie => movie.media_type !== undefined ? String(movie.media_type).toLocaleLowerCase() == String(mediaType).toLocaleLowerCase() : true);
        }
        if (genre) {
            tasks = tasks.filter(movie => movie.genre_ids ? movie.genre_ids.includes(Number(genre)) : true);
        }
        if (language) {
            tasks = tasks.filter(movie => movie.language !== undefined ? String(movie.language.toLocaleLowerCase()).includes(language.toLocaleLowerCase()) : true);
        }
        return tasks;
    }
}