const validateToken = require('../utils/jwt')

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers['authorization'])
            throw error

        let [type, token] = req.headers['authorization'].split(' ')

        if (!token || token == '')
            throw error

        let user = await validateToken(token)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Unauthenticated' })
    }
}

module.exports = authMiddleware