const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
const port = 5001;
const moviesRoutes = require('./routes/moviesRoutes');
const { authorized , notFound} = require('./middleware/authentication');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(authorized);
app.use('/api/movies', moviesRoutes)
app.use(notFound)
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => { console.log("http://localhost:" + port); });