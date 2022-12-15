import { Schema, model } from 'mongoose';
import Task from '@/resources/task/task.interface';

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: false,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category'

        }
    },

    { timestamps: true }
);

export default model<Task>('Task', TaskSchema);