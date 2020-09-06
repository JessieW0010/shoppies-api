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
    res.json({
      msg: 'youve reached /register!'
    })
  }  
}

export default AuthController;
