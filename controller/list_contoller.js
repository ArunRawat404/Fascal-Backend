const List = require('../models/list_model');

const createList = async (req, res) => {
    const { name, privacy, movie } = req.body;
    console.log("ss", name, privacy)
    const userId = req.body.user._id;
    console.log(userId, "user")
    try {
        const newList = new List({ name, privacy, movies: movie, user: userId });
        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const getUserLists = async (req, res) => {
    const userId = req.params.userId;
    try {
        const lists = await List.find({ user: userId });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createList, getUserLists };
