const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        thoughts: async (parent, { username }) => {
            // if username then it will return thougts just for that username, 
            // if empty it returns all thoughts for all usernames
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // place this inside of the `Query` nested object right after `thoughts`
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }
    }
};

module.exports = resolvers;