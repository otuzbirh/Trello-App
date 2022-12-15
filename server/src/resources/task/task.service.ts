import TaskModel from "./task.model";
import Task from "./task.interface";

class TaskService {
    private task = TaskModel;

    public async create(title: string, body:string,  category: string): Promise<Task> {
        try {
            const task = await this.task.create({ title, body, category });
            return task;
        }
        catch (error) {
            throw new Error("Unable to create task!");
        }
    }

    public async update(body: { title?: string,  categoryId?: string }, id: string): Promise<Task | null> {
        try {
            await this.task.findOneAndUpdate({ _id: id }, { ...body });
            let task = await this.task.findById(id);
            return task;
        }
        catch (error) {
            console.log(error)
            throw new Error("Unable to update task!");
        }
    }

    public async get(id: string): Promise<Task | null> {
        try {
            const task = await this.task.findOne({ _id: id });
            return task;
        }
        catch (error) {
            console.log(error)
            throw new Error("Unable to create task!");
        }
    }

    public async list(): Promise<Task[]> {
        try {
            const tasks = await this.task.find({});
            return tasks;
        }
        catch (error) {
            throw new Error("Unable to create task!");
        }
    }

    public async listByCategoryId(category_id: string): Promise<Task[]> {
        try {
            const tasks = await this.task.find({category: category_id});
            return tasks;
        }
        catch (error) {
            throw new Error("Unable to create task!");
        }
    }

    public async delete(id: string | Number): Promise<Task | null> {
        try {
            const task = await this.task.findByIdAndDelete(id);

            return task;
        }
        catch (error) {
            throw new Error("Error happened while trying to delete the task");
        }
    }

     /**
     * 
     * Get tasks
     */

     public async getTasks() {
        try {
            const  tasks = this.task.find({});
            return tasks;
          
           
        }
        catch(error) {
                throw new Error("Unable to get tasks!");
        }
     }
}

export default TaskService;