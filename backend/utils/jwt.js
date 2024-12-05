const jwt = require('jsonwebtoken');
require('dotenv').config()

const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err)
                reject(err);

            resolve(decoded);
        });
    });
}

module.exports = validateToken