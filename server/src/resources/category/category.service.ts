import CategoryModel from "./category.model";
import Category from "./category.interface";
import TaskService from '../task/task.service';
import Categories from "./category.interface";


class CategoryService {
  private category = CategoryModel;
  private taskService = new TaskService();

  public async create({ name, user_id }: { name: string, user_id: string }): Promise<Category> {
    try {
      const category = await this.category.create({ name, user:user_id });

      return category;
    }
    catch (error) {
      throw new Error("Unable to create category!");
    }
  }

  public async update(body: { name?: string, items?: string }, id: string): Promise<Category | null> {
    try {
      await this.category.findOneAndUpdate({ _id: id }, { ...body });
      let category = await this.category.findById(id);

      return category;
    }
    catch (error) {
      console.log(error)
      throw new Error("Unable to update task!");
    }
  }

  public async delete(id: string): Promise<Category | null> {
    try {
      let category = await this.category.findByIdAndDelete(id);

      return category;
    }
    catch (error) {
      console.log(error)
      throw new Error("Unable to delete category");
    }
  }

  public async list({user_id}: { user_id: string }): Promise<Categories[]> {
    try {
      const categories = await this.category.find({user: user_id});
      const cat: Categories[]=[];
      await Promise.all(categories.map(async(category)=> {
            const cat_p=JSON.parse(JSON.stringify(category));
            const tasks = await this.taskService.listByCategoryId(category._id);
            cat_p.tasks=tasks;
            cat.push(cat_p);
          })
      );

    return cat;

    }
    catch (error) {
      throw new Error("Unable to create category!");
    }
  }

  public async get(id: string): Promise<Category | null> {
    try {
      const category = await this.category.findOne({ _id: id });
      return category;

    }
    catch (error) {
      throw new Error("Unable to create category!");
    }
  }
}

export default CategoryService;