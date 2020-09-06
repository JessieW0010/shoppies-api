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
    const { title, type } = req.body;
    try {
      let request = "http://www.omdbapi.com/?apikey=62c4ef62";

      if (title) {
        request += `&s=${title.split(' ').join('+')}`;
      }
      if (type) {
        request += `&type=${type}`;
      }

      const apiResponse = await Axios.get(request);

      return res.status(200)
      .json({
        data: apiResponse.data
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
