import { Schema, model } from 'mongoose';
import User from '../types/User';

const schema = new Schema<User>({
    name: { 
        type: String, 
        required: [true, 'the "name" is required'] 
    },
    email: { 
        type: String, 
        required:  [true, 'the "email" is required'],
        unique: true
    },
    password: { 
        type: String, 
        required:  [true, 'the "password" is required']  
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required:  [true, 'the "role" is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

schema.methods.toJSON = function () {

    const { __v, password, ...user } = this.toObject();
    
    return user;

};

export const UserModel = model<User>('User', schema);