import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
    // roles: [{ type: Schema.Types.ObjectId, ref: 'role' }],
    active: { type: Boolean, default: false },
    signupDate: { type: Date, default: Date.now() },
    signinDate: { tpye: Date }
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