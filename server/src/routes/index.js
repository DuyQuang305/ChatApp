const loginRouter = require('./Login');
const registerRouter = require('./Register');
const setAvatarRouter = require('./SetAvatar');
const usersRouter = require('./Users');
const messageRouter = require('./Message');


function router(app) {
    app.use('/api/auth/register', registerRouter);
    app.use('/api/auth/login', loginRouter);
    app.use('/api/auth/setAvatar', setAvatarRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/message', messageRouter);

}

module.exports = router;