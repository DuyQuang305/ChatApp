const users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    // [GET] / api/auth/register
    async checkUser(req, res, next) {
        try {
            const { username, password } = req.body;
    
            // Tìm người dùng trong cơ sở dữ liệu
            const user = await users.findOne({ username });
    
            if (!user) {
                return res.json({ msg: "Incorrect username or password", status: false });
            }
    
            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                return res.json({ msg: "Incorrect username or password", status: false });
            }
    
            delete user.password;
            // Tạo token và gửi về cho người dùng
            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    
            return res.json({ status: true, user, token });
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = new LoginController;