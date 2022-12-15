import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import UserController from './resources/user/user.controller';
import App from './app';
import TaskController from './resources/task/task.controller';
import CategoryController from './resources/category/category.controller';

validateEnv();

const app = new App(
    [
        new UserController(),
        new TaskController(),
        new CategoryController()
    ],
    Number(process.env.PORT)
);

app.listen();