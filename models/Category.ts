import { Schema, model, Document, Model, PopulatedDoc } from 'mongoose';
import { IUser } from './User';

export interface ICategory extends Document{
    name: string;
    status?: string;
    user: PopulatedDoc<IUser>
};

const schema: Schema = new Schema({
    name: { 
        type: String, 
        required: [true, 'the "name" is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        //required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const CategoryModel: Model<ICategory> = model<ICategory>('Category', schema);