const fs = require('fs');
const path = require('path');
const dirRoot = require('../utils/path');

const DATA_PATH = path.join(dirRoot, 'data', 'videoList.json');


module.exports = class Video {
    static getAllVideoTrailers = () => {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    }

    static filterTrailer = (trailer) => {
        let result = trailer.filter(a => a.official == true && a.site === 'YouTube' && (a.name.includes('Trailer') || a.name.includes('Teaser')))
            .sort((a, b) => a.published_at.localeCompare(b.published_at))[0];
        return result;
    };

    static getTrailerByFilmId = (filmId) => {
        const listTrailer = this.getAllVideoTrailers().filter(trailer => trailer.id == filmId);
        if (!listTrailer) {
            return null
        }

        const filteredVideos = filterTrailer(listTrailer[0].videos)
        return filteredVideos;
    }

}
