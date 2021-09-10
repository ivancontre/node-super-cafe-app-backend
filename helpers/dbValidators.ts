import { RoleModel } from "../models/Role";
import { UserModel } from "../models/User";

export const isValidRole = async (name: string) => {

    const roleExists = await RoleModel.findOne({ name });

    if (!roleExists) {
        throw new Error(`El rol "${ name }"" no está registrado en la BD`);
    }

};

export const existsEmail = async (email: string) => {

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        throw new Error(`El email "${ email }" ya se encuentra registrado en la BD`);
    }
};

export const existsUser = async (id: string) => {

    const userExists = await UserModel.findById(id);

    if (!userExists) {
        throw new Error(`El ID "${ id }" no existe`);
    }
};