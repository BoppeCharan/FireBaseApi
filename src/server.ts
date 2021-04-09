import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';
import staffManagementRoute from'./routes/employee.route';

validateEnv();

const app = new App([new IndexRoute(), new staffManagementRoute(), new AuthRoute()]);

app.listen();
