import User from '../models/user'

module.exports = {
    // List all users
    list: (req, res) => {
        res.status(200).json({ message: 'List users' })
    },

    // Get a user
    get: (req, res) => {
        res.status(200).json({ message: 'Get a user' })
    },

    // Create a user
    create: (req, res) => {
        res.status(200).json({ message: 'Create user' })
    },

    // Update a user
    update: (req, res) => {
        res.status(200).json({ message: 'Update user' })
    },

    // Delete a user
    delete: (req, res) => {
        res.status(200).json({ message: 'Delete user' })
    }
}