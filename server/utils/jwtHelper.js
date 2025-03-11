import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config()

const secretKey = process.env.SECRET_KEY;  // Store this securely!
export function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, secretKey, {
        expiresIn: '24h'
    });
};
export function verifyToken(token) {
    return jwt.verify(token, secretKey);
};
// module.exports = { generateToken, verifyToken };