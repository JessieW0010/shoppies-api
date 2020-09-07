import bcrypt from 'bcryptjs';
import knex from '../knex.js';
import jwt from 'jsonwebtoken';
import { accountsTable } from '../models/tableNames.js';
/**
 * @description - contains static methods for authentication
 */

const jwtKey = process.env.JWT_SECRET_KEY
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

  /**
   * @description - checks if acct exists and email and password are correct
   * @param { object } req - request object
   * @param { object } res - response object
   */
  static async login(req, res) {
    const { email, password } = req.body;
    knex.select('*').from(accountsTable).where('email', 'ilike', email)
      .then((account) => {
        
        if (account.length > 0) {
          const accountInfo = account[0];
          const passwordCorrect = bcrypt.compareSync(password, accountInfo.password);
          if (passwordCorrect) {
            const token = jwt.sign({
              id: accountInfo.id
            }, jwtKey);
            return res.status(200).json({
              msg: "Login successful",
              token
            })
          } else {
            return res.status(401).json({
              msg: "Invalid Credentials",
            })
          }
        } else {
          return res.status(401).json({
            msg: "Invalid Credentials",
          })
        }
      })
      .catch((err)=>{
        console.log(err)
        return res.status(500)
        .json({
          msg: 'Internal server error.',
          err
        })
      });
  }
}

export default AuthController;
