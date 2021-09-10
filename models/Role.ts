import { Schema, model } from 'mongoose';
import Role from '../types/Role';

const schema = new Schema<Role>({
    name: { 
        type: String, 
        required: [true, 'the "name" is required'] 
    }
});

export const RoleModel = model<Role>('Role', schema);