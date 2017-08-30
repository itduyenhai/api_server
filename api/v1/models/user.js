import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import uuidv4 from 'uuid/v4';

const UserSchema = mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    active: { type: Boolean, default: false },
    secret: { type: String, default: uuidv4() },
    created_at: { type: Date, default: Date.now() },
    updated_at: { tpye: Date },
    deleted_at: { tpye: Date }
})

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

module.exports = mongoose.model('User', UserSchema)