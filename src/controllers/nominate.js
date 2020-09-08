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
        return res.status(500)
        .json({
          msg: 'Internal server error.',
          err
        })
      });
  }

  static async unNominateMovies(req, res) {
    const { imdbID } = req.body;
    const user_id = req.user.id;

    return knex(nominationsTable)
      .where((qb) => {
        if (user_id) {
          qb.where('user_id', '=', user_id);
        } 
        if (imdbID) {
          qb.orWhere('imdbID', '=', imdbID);
        }
      })
      .del()
      .then(() => {
        return res.status(200)
        .json({
          msg: 'Successfully deleted nomination.'
        })
      })
      .catch((err) => {
        return res.status(500)
        .json({
          msg: 'Internal server error.',
          err
        })
      });
  }

  static async getNominated(req, res) {
    return knex.select('imdbID').from(nominationsTable).where('user_id', req.user.id)
      .then((nominated) => {
        return res.status(200)
        .json({
          nominated
        })
      })
      .catch((err) => {
        return res.status(500)
        .json({
          msg: 'Internal server error.',
          err
        })
      });
  }
}

export default NominateController;
