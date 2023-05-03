const users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController {
    // [GET] / api/users
    async show(req, res, next) {
        try {
                const {id} = req.params
                const Users = await users.find({ _id: { $ne: id } }).select([
                    'email',
                    'username',
                    'avatarImage',
                    '_id',
                ]);
                return res.json(Users)
            }
        catch (err) {
            next(err)
        }
    
    }
}
module.exports = new UsersController;