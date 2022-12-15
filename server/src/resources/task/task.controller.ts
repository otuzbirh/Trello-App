import { Router, Request, Response, NextFunction } from 'express';
import Controller from './../../utils/interfaces/task.interface';
import HttpException from './../../utils/exceptions/http.exception';
import validationMiddleware from './../..//middleware/validation.middleware';
import validate from './../../resources/task/task.validation';
import TaskService from './../../resources/task/task.service';
import CategoryModel from '../category/category.model'

class TaskController implements Controller {
    public path = '/tasks';
    public router = Router();
    private TaskService = new TaskService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            this.path,
            validationMiddleware(validate.create),
            this.create
        );

        this.router.get(
            this.path,
            this.getAllTasks
        );

        this.router.get(
            `${this.path}/:id`,
            this.getTask
        );

        this.router.delete(
            `${this.path}/:id`,
            this.deleteTask
        )

        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.update),
            this.update
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body, category } = req.body;

            const task = await this.TaskService.create(title, body, category);

            res.status(201).json({ task });
        } catch (error) {
            next(new HttpException(400, 'Cannot create task'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const task = await this.TaskService.update(req.body, id);

            res.status(200).json({ task });
        } catch (error) {
            next(new HttpException(400, 'Cannot update task'));
        }
    };

    private getAllTasks = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const tasks = await this.TaskService.list();

            res.status(200).json(tasks);
        } catch (error) {
            next(new HttpException(400, 'Cannot create task'));
        }
    };

    private getTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const task = await this.TaskService.get(id);

            res.status(200).json(task);
        } catch (error) {
            next(new HttpException(400, 'Cannot get task'));
        }
    };

    private deleteTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params
            const result = await this.TaskService.delete(id)

            res.status(204).json({ result })
        } catch (err) {
            next(new HttpException(400, 'Cannot delete task'))
        }
    }
}

export default TaskController;