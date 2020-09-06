import "dotenv/config.js";
import Axios from 'axios';
/**
 * @description - contains static methods for searching movies
 */
class SearchController {
  static async searchByTitle(req, res) {
    const { title, page } = req.body;
    try {
      let request = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&s=${title.split(' ').join('+')}`;

      if (page) {
        request += `&page=${page}`;
      }

      const apiResponse = await Axios.get(request);

      return res.status(200)
      .json({
        movies: apiResponse.data.Search,
        totalResults: apiResponse.data.totalResults
      })
      
    } catch (err) {
      return res.status(500)
      .json({
        msg: 'Internal server error.',
        err
      })
    }
  }

  static async searchById(req, res) {
    const { id } = req.body;
    try {
      let request = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full&type=movie`;

      const apiResponse = await Axios.get(request);

      return res.status(200)
      .json({
        movie: apiResponse.data
      })
      
    } catch (err) {
      console.log(err)
      return res.status(500)
      .json({
        msg: 'Internal server error.',
        err
      })
    }
  }
}

export default SearchController;
