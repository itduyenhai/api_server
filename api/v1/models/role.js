import mongose from 'mongoose'

const RoleSchema = mongose.Schema({
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

module.exports = mongose.model('Role', RoleSchema)