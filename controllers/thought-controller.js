const { Thought, User } = require ('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
  
    createThoughts({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then((dbThoughtData) => {        
                return User.findOneAndUpdate( 
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
                    .select('-__v');
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                console.log(dbUserData)
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    
    updateThoughts({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThoughts({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    createReactions({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    deleteReactions({ params }, res) {
        console.log(params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;