import mongose from 'mongoose'

const ProfileSchema = mongose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    display: {
        type: String,
        require: true
    },
    description: {
        type: String
    }
})

module.exports = mongose.model('Profile', RoleSchema)