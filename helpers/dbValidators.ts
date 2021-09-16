import { CategoryModel, ProductModel, RoleModel, UserModel } from "../models";

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
        throw new Error(`El ID "${ id }" de usuario no existe`);
    }
};

export const existsCategory = async (id: string) => {

    const categoryExists = await CategoryModel.findById(id);

    if (!categoryExists || !categoryExists.status) {
        throw new Error(`El ID "${ id }" de categoría no existe`);
    }
};

export const existsProduct = async (id: string) => {

    const productExists = await ProductModel.findById(id);

    if (!productExists || !productExists.status) {
        throw new Error(`El ID "${ id }" de producto no existe`);
    }
};