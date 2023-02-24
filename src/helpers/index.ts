import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

//hashing the password
export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(process.env.AUTH_SECRET)
    .digest('hex');
};
