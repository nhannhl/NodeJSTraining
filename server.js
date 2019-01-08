import express from 'express';
import bodyParser from 'body-parser';
import expressPartial from 'express-partials';
import ejs from 'ejs';
import authentication from './managements/middleware/authentication';
import connectToDb from './db/connect';
import user from './routes/user.routes';
import group from './routes/group.routes';
import login from './routes/login.routes';
import installdb from './routes/installdb.routes';

const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(expressPartial());
server.use(express.static("wwwroot"));
server.set('view engine', 'ejs');

server.use(installdb);
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

