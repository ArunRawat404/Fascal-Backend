const searchMovies = async (req, res) => {
    const query = req.query.q;
    console.log(query)
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
        const data = await response.json();
        if (data.Response === 'True') {
            res.json(data.Search);
        } else {
            res.status(404).json({ message: 'No movies found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { searchMovies };
