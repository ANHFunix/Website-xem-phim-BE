const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');
const Video = require('../models/videoModel');
const { getTotalPage, getMoviesByPage } = require('../utils/Paging');


const getAllMovieTrending = (req, res) => {
    try {
        const pageParam = req.query.page || 1;
        const moviesTreding = Movie.getMovieTrending();
        const response = {
            results: getMoviesByPage(moviesTreding, pageParam),
            page: pageParam,
            total_pages: getTotalPage(moviesTreding),
        };

        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).send( error);
    }
}

const getAllMovieTopRate = (req, res) => {
    try {
        const pageParam = req.query.page || 1;
        const movieTopRate = Movie.getMovieTopRate();
        const response = {
            results: getMoviesByPage(movieTopRate, pageParam),
            page: pageParam,
            total_pages: getTotalPage(movieTopRate),
        };

        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách phim top rate' });
    }
}

const getAllGenres = (req, res) => {
    try {
        const listGenre =  Genre.getAllGenres();
        return res.status(200).send(listGenre); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    }

}

const getAllMovieDiscover = (req, res) => {
    try {
        const genre = req.query.genre;
        const pageParam = req.query.page || 1;
        if (!genre) {
            return res.status(400).json({ error: "Not found gerne parram" });
        }
        if (!Genre.getMovieDiscover(Number(genre)).status) {
            return res.status(400).json({ error: "Not found that gerne id" });
        }
        const allMovies = Movie.getAllMovies();
        const movieDiscover = allMovies.filter(m =>
            m.genre_ids.includes(Number(genre))
        )
        const genre_name = Genre.getMovieDiscover(Number(genre)).result;
        const response = {
            results: getMoviesByPage(movieDiscover, pageParam),
            page: pageParam,
            total_pages: getTotalPage(movieDiscover),
            genre_name: genre_name
        };
        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getTrailerById = (req, res) => {
    try {
        const film_id = req.body.film_id;
        if (!film_id) {
            return res.status(400).json({ error: "Not found film_id parram" });
        }
        if (Video.getTrailerByFilmId(film_id) == null) {
            return res.status(400).json({ error: "Not found video" });
        }
        const response = {
            results: Video.getTrailerByFilmId(film_id)
        };
        return res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getMovieByKyWorld = (req, res) => {
    try {
        const pageParam = req.query.page || 1;
        const keyword = req.body.keyword;
        if (!keyword) {
            return res.status(400).json({ error: "Not found keyword parram" });
        }
        const results = Movie.getMovieByKeyword(keyword);
        const response = {
            results: results,
            page: pageParam,
            total_pages: getTotalPage(results),
        };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Lỗi khi lấy trailer', error });
    }
}

const getSearchMore = (req, res) => {
    try {
        const pageParam = req.query.page || 1;
        const keyword = req.query.keyword;
        const language = req.query.language;
        const year = req.query.year;
        const mediaType = req.query.mediaType;
        const genre = req.query.genre;
        if (!keyword) {
            return res.status(400).json({ error: "Not found keyword parram" });
        }
        const results = Movie.getSearchMore(keyword, mediaType, language, year, genre);
        const response = {
            count: results.length,
            results: results,
            page: pageParam,
            total_pages: getTotalPage(results),
        };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {getAllGenres, getSearchMore, getAllMovieTrending, getAllMovieTopRate, getAllMovieDiscover, getTrailerById, getMovieByKyWorld }     