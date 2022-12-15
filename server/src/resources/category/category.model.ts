import { Schema, model } from 'mongoose';
import Category from '@/resources/category/category.interface';


const CategorySchema = new Schema<Category>(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    { timestamps: true }
);

export default model<Category>('Category', CategorySchema);