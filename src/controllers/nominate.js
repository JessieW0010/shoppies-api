import knex from '../knex.js';
import { nominationsTable } from '../models/tableNames.js';
/**
 * @description - contains static methods for nominating movies
 */
class NominateController {
  static async nominateMovies(req, res) {
    const { imdbIDs } = req.body;
    const user_id = req.user.id;

    const moviesToNominate = imdbIDs.map(id => ({ user_id, imdbID: id })); 

    return knex(nominationsTable).insert(moviesToNominate)
      .then(() => {
        return res.status(200)
        .json({
          msg: 'Successfully nominated movies.'
        })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500)
        .json({
          msg: 'Internal server error.',
          err
        })
      });
  }
}

export default NominateController;