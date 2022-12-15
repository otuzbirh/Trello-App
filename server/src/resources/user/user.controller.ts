import { Router, Request, Response, NextFunction } from 'express';
import Controller from './../../utils/interfaces/controller.interface';
import HttpException from './../../utils/exceptions/http.exception';
import validationMiddleware from './../../middleware/validation.middleware';
import validate from './../../resources/user/user.validation';
import UserService from './../../resources/user/user.service';
import authenticated from './../../middleware/authenticated.middleware';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(`/user`, authenticated, this.getUser);

        this.router.get(
            `${this.path}`,
            this.getAllUsers
        );
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { first_name, last_name, email, password} = req.body;

            const token = await this.UserService.register(
                first_name,
                last_name,
                email,
                password,
             
              
            );

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send({ data: req.user });
    };
    private getAllUsers  = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        const users = await this.UserService.getAllUsers();
        res.status(200).json(users);
    };
}

export default UserController;