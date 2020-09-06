import bcrypt from 'bcryptjs';
import knex from '../knex.js';
import { accountsTable } from '../models/tableNames.js';
/**
 * @description - contains static methods for authentication
 */
class AuthController {
  /**
   * @description - creates a new account
   * @param { object } req - request object
   * @param { object } res - response object
   */
  static async register(req, res) {
    const { first_name, last_name, email, password } = req.body;

    knex(accountsTable).where('email', 'ilike', email)
    .then((account) => {

      // Account already exists
      if (account.length > 0) {
        return res.status(409)
        .json({
          msg: 'Email already exists.'
        })
      }

      const password_digest = bcrypt.hashSync(password, 10);

      // Create account
      knex(accountsTable)
      .insert({
        first_name,
        last_name,
        email,
        password: password_digest,
      })
      .then(() => {
        return res.status(200)
        .json({
          msg: 'Account created!'
        })
      })
      
    })
    .catch((err) => {
      return res.status(500)
      .json({
        msg: 'Internal server error.',
        err
      })
    })
  }
}

export default AuthController;
