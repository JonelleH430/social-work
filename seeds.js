const mongoose = require('mongoose')
const { User, Thought } = require('./models')

mongoose.connect('mongodb://localhost/social-work')
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(err))

const users = [
    {username: 'nellz', email: 'nellz@mail.com'},
    {username: 'rome', email: 'another@mail.com'},
    {username: 'joan', email: 'joan@mail.com'},
    {username: 'tan', email: 'tan@mail.com'},
    {username: 'nessia', email: 'nessia@mail.com'},
    {username: 'perry', email: 'perry@mail.com'},
    {username: 'neel', email: 'neel@mail.com'}
]

const thoughts = [
    {thoughtText: "thought 1", writtenBy: "nellz"},
    {thoughtText: "thought 2", writtenBy: "rome"},
    {thoughtText: "thought 3", writtenBy: "joan"},
    {thoughtText: "thought 4", writtenBy: "tan"},
    {thoughtText: "thought 5", writtenBy: "nessia"},
    {thoughtText: "thought 6", writtenBy: "nessia"},
    {thoughtText: "thought 7", writtenBy: "perry"},
    {thoughtText: "thought 8", writtenBy: "neel"},
]

const getThoughtIds = thoughts => {
    const thoughtIds = []

    thoughts.forEach(thought => thoughtIds.push([thought._id.valueOf(), thought.writtenBy]))
    return thoughtIds
}

const addThoughtsToUsers = (thoughtsOfUsers) => {
    thoughtsOfUsers.forEach( async (userThought) => {
        await User.findOneAndUpdate(
            {username: userThought[1]},
            {$push: {thoughts: mongoose.Types.ObjectId(userThought[0])}}
        )
    })
}

const seedDb = async () => {
    await User.deleteMany({})
    await User.insertMany(users)
    await Thought.deleteMany({})
    await Thought.create(thoughts)
    .then(getThoughtIds)
    .then(addThoughtsToUsers)
    .then(console.log('Seed complete'))
}

seedDb().then(() => {
    console.log('finishing up')
    setTimeout(() => {
        mongoose.connection.close()
        console.log('connection closed')
    }, 3000)
})