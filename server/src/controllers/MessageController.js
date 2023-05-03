const messageModel = require('../model/MessageModel');

class MessageController {
    // [GET] /api/message
    async showMessage(req, res, next) {
        try {
            const { from, to} = req.body;
            const message = await messageModel
                .find({
                    users: {
                        $all: [from, to],
                    },
            })
            .sort({ updateAt: 1});

            const projectMessages = message.map( (msg) => {
                return {
                    fromSelf: msg.sender.toString() === from, 
                    message: msg.message.text,
                };
            })

            res.json(projectMessages)

        } catch (err) {
            next(err)
        }
    }

    // [POST] / api/message
    async addMessage(req, res, next) {
        try {
            const { from, to, message } = req.body;
            const data = await messageModel.create({
                message: {text: message},
                users: [from, to],
                sender: from,
            });

            if(data) {
                return res.json( {msg: 'Message added successfully.'})
            } else {
                return res.json( {msg: 'failed to add message to the database.'}) 
            }
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = new MessageController;