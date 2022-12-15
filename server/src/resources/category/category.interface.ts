import {Document, Schema, Types} from 'mongoose';
import Task from "@/resources/task/task.interface";

export default interface Category extends Document {
    name: string;
    user: Schema.Types.ObjectId;
}

export default interface Categories extends Document {
    name: string;
    user: Schema.Types.ObjectId;
    tasks: Task[];
}