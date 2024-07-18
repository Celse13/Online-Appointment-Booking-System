import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY ?? '';

class JWT {
  static generateJwt(
    _id: string,
    email: string,
    username: string,
    role: string,
  ): string {
    return jwt.sign({ _id, email, username, role }, SECRET_KEY, {
      expiresIn: '45d',
    });
  }
}

export default JWT;
