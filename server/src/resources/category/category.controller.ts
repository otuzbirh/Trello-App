import { Router, Request, Response, NextFunction } from 'express';
import Controller from './../../utils/interfaces/task.interface';
import HttpException from './../../utils/exceptions/http.exception';
import validationMiddleware from './../..//middleware/validation.middleware';
import validate from './../../resources/category/category.validation';
import CategoryService from './../../resources/category/category.service';

class CategoryController implements Controller {
    public path = '/category';
    public router = Router();
    private CategoryService = new CategoryService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            this.path,
            validationMiddleware(validate.create),
            this.create
        );

        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.update),
            this.update
        );

        this.router.get(
            '/categories',
            this.getAllCategories
        );

        this.router.get(
            `${this.path}/:id`,
            this.getCategory
        );

        this.router.delete(
            `${this.path}/:id`,
            this.deleteCategory
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name } = req.body;
            const createCategory = await this.CategoryService.create({ name, user_id: req.user._id });

            res.status(201).json({ createCategory });
        } catch (error) {
            next(new HttpException(400, 'Cannot create category'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const result = await this.CategoryService.update(req.body, id);

            res.status(201).json({ result });
        } catch (error) {
            next(new HttpException(400, 'Cannot update category'));
        }
    };

    private getCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params
            const category = await this.CategoryService.get(id);

            res.status(200).json(category);
        } catch (error) {
            next(new HttpException(400, 'Cannot get category'));
        }
    };

    private getAllCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const categories = await this.CategoryService.list({user_id: req.user._id});

            res.status(200).json(categories);
        } catch (error) {
            next(new HttpException(400, 'Cannot list categories'));
        }
    };

    private deleteCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params
            const result = await this.CategoryService.delete(id)

            res.status(204).json({ result })
        } catch (err) {
            next(new HttpException(400, 'Cannot delete category'))
        }
    }
}

export default CategoryController;