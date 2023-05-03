const users = require('../model/users');
const bcrypt = require('bcrypt');

class registerController {
    // [GET] / api/auth/register
    async createUser(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const usernameCheck = await users.findOne({username})
            const emailCheck = await users.findOne({email})

            if (usernameCheck) {
                return res.json({msg: "Username already used", status: false});
            } else if (emailCheck) {
                return res.json({msg: "email already used", status: false});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await users.create({ username,  email, password: hashedPassword});
            
            delete user.password;
            return res.json({ status: true, user });
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new registerController;