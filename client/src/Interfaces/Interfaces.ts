

export interface ICategory {
  _id?: string;
  name: string;
  user?: string;
  tasks?: ITask[];
}

export interface ITask {
  _id?: string;
  title: string;
  body?: string;
  category?: string|undefined;

}

export interface ITask2 {
  
  category?: string|undefined;

}

export interface ITask3 {
  
  title: string;

}

