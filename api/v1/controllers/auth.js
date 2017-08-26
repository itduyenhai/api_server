import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcryptjs'
import User from '../models/user'

module.exports = {
    // Register
    signup: (req, res) => {

        if (!req.body.email || !req.body.password) {
            res.status(403).json({ message: 'Nhập thông tin tài khoản' })
        }
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })

        user.save((err) => {
            if (err) res.status(500).json({ message: 'Không đăng ký được tài khoản' })
            res.status(200).json({
                message: 'Đăng ký tài khoản thành công',
                // token: service.createToken(user)
            })
        })
    },

    // Login
    signin: (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).json({ message: err })

            if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại' })

            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {

                if (isMatch && !err) {
                    // req.user = user
                    var token = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, config.SECRET_TOKEN, {
                        expiresIn: 1440 // expires in 24 hours
                    })
                    res.status(200).json({
                        message: 'Đăng nhập thành công',
                        token: token
                    })
                } else {
                    res.status(500).json({ message: 'Thông tin không hợp lệ' })
                }
            })

        })
    }
}