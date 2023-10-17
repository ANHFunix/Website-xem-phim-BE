const PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

const getTotalPage = (movies) => {
    return Math.ceil(movies.length / PAGE_SIZE)
}

const getMoviesByPage = (movies, page = DEFAULT_PAGE) => {
    const results = movies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
    return results;
}
module.exports = { getTotalPage, getMoviesByPage }