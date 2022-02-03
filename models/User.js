const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
        },
        thoughts: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        
        },
        id: false
    }
);

const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function() {
    return this.friend.length;
})

module.exports = User;