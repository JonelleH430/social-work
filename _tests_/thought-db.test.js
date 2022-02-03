const mongoose = require('mongoose')
const thoughtModel = require('../models/Thought')
const thoughtData = {thoughtText: 'thought 1', writtenBy: 'nellz'}

describe('Thought db test', () => {

    beforeAll(() => {
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

    it('created and saved thought', async () => {
        const validThought = new thoughtModel(thoughtData)
        const savedThought = await validThought.save()

        expect(savedThought._id).toBeDefined()
        expect(savedThought.thoughtText).toBe(thoughtData.thoughtText)
        expect(savedThought.writtenBy).toBe(thoughtData.writtenBy)
        expect(Array.isArray(savedThought.reactions)).toBe(true)
    })
})