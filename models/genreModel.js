const fs = require('fs')
const path = require('path')
const dirRoot = require('../utils/path')


module.exports = class Genre {
    static getAllGenres = () => {
        const GENRE_NAME = path.join(__dirname, '..','data', 'genreList.json');
        return JSON.parse(fs.readFileSync(GENRE_NAME, 'utf8'));
    }

    static getMovieDiscover = (genreId) => {
        const genre = this.getAllGenres();
        const genre_name = genre.filter(g => g.id = genreId);
        let result;
        let status = false;
        if (genre_name.length > 0) {
            result = genre_name[0].name;
            status = true;
        } else {
            result = null;
            status = false;
        }
        return {
            result: result,
            status: status
        };
    }
}