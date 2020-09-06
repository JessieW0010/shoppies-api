import "dotenv/config.js";
import Axios from 'axios';
/**
 * @description - contains static methods for authentication
 */
class SearchController {
  /**
   * @description - creates a new account
   * @param { object } req - request object
   * @param { object } res - response object
   */
  static async search(req, res) {
    const { title } = req.body;
    try {
      let request = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

      if (title) {
        request += `&s=${title.split(' ').join('+')}`;
      }

      const apiResponse = await Axios.get(request);

      return res.status(200)
      .json({
        data: apiResponse.data.Search
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
