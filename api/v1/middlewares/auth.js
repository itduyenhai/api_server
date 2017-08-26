import config from '../config'
import jwt from 'jsonwebtoken'

function isAuth(req, res, next) {

    var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        jwt.verify(token, config.SECRET_TOKEN, function(err, decoded) {
            if (err) {
                return res.status(500).json({ message: 'Lỗi chứng thực' });
            } else {
                req.decoded = decoded;
                next();
            }
        })

    } else {
        return res.status(403).send({
            message: 'Chứng thực không tồn tại'
        })
    }
}

module.exports = isAuth