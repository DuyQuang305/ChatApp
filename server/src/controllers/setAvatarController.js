const users = require('../model/users');

class setAvatarController {
    async setAvatar(req, res, next) {
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            const userData = await users.findOneAndUpdate(
                { _id: userId }, 
                { isAvatarImageSet: true, avatarImage }
            );

            if (!userData) {
                return res.status(404).json({
                    message: 'Không tìm thấy người dùng',
                });
            }

            return res.json({
                isSet: userData.isAvatarImageSet,
                image: userData.avatarImage,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new setAvatarController();
