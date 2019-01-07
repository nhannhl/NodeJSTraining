import express from 'express';
import bodyParser from 'body-parser';
import authentication from './managements/middleware/authentication';
import connectToDb from './db/connect';
import user from './routes/user.routes';
import group from './routes/group.routes';
import login from './routes/login.routes';

const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(login);
server.use(authentication);

server.use(user);
server.use(group);

server.use((err, req, res, next) => {
	return res.status(400).json({
		isSuccess: false,
		message: err.message
	});
});

server.listen(3000, () => {
    console.log('Server started at: 3000');
});

