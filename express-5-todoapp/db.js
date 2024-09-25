const mongoose = require("mongoose");

const schema = mongoose.Schema;
const objectID = schema.ObjectId;

const Users = new schema({
    name: String,
    email:String,
    password: String
});

const Todo = new schema({
    userId: objectID,
    title: String,
    done:Boolean
});

const UserModel = mongoose.model('users',Users);

const TodoModel = mongoose.model('todos',Todo);

module.exports = {
    UserModel:UserModel,
    TodoModel:TodoModel
}