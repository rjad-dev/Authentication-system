import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { accessTokenExpiresIn, jwtSecretKey, refreshTokenExpiresIn } from "../config";

class Authenticate {
  private static instance: Authenticate;
  constructor() {}

  static get(): Authenticate {
    if (!Authenticate.instance) {
      Authenticate.instance = new Authenticate();
    }

    return Authenticate.instance;
  }

  public async generateAccessToken(payload) {
    const options: SignOptions = {
      expiresIn: refreshTokenExpiresIn,
      algorithm: 'HS512'
    };

    return jwt.sign({id: payload.id, email: payload.id}, jwtSecretKey, options)
  }

  public async verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log(decoded);
      return { success: true, data: decoded };
    } catch (error) {
      throw new Error(`Auth Failed: ${error.message}`);
    }
  }
}

const authenticate = Authenticate.get();
export { authenticate as Authenticate };
