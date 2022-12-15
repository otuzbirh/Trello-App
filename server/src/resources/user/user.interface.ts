import { Document } from 'mongoose';

export default interface User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    
    // role: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}