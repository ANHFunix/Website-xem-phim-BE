const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.get("/trending", movieController.getAllMovieTrending);
router.get("/top-rate", movieController.getAllMovieTopRate);
router.get("/discover", movieController.getAllMovieDiscover);
router.get("/getAllGenres", movieController.getAllGenres);
router.post("/video", movieController.getTrailerById);
router.post("/search", movieController.getMovieByKyWorld);
router.get("/searchMore", movieController.getSearchMore);

module.exports = router;