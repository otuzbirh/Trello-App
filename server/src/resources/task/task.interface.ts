import { Document } from 'mongoose';

export default interface Task extends Document {
    title: string;
    body: string;
    categoryId: string;
}