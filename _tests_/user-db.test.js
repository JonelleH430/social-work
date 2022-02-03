const mongoose = require('mongoose')
const userModel = require('../models/User')
const userData = {username: 'nellz', email: 'nellz@mail.com'}

describe('User model test', () => {

    beforeAll( () => {
        mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true }, err => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    it('created and saved user successfully', async () => {
        const validUser = new userModel(userData)
        const savedUser = await validUser.save()

        expect(savedUser._id).toBeDefined()
        expect(savedUser.username).toBe(userData.username)
        expect(savedUser.email).toBe(userData.email)
        expect(Array.isArray(savedUser.thoughts)).toBe(true)
        expect(Array.isArray(savedUser.friends)).toBe(true)
    })
})