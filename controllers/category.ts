import { Request, Response} from 'express';
import { CategoryModel, ICategory } from '../models';

export const getCategories = async (req: Request, res: Response) => {    

    try {

        return res.status(200).json({
            msg: 'Categories getted'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }

};

export const getCategory = async (req: Request, res: Response) => {    

    try {

        return res.status(200).json({
            msg: 'Category getted'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }

};


export const postCategory = async (req: Request, res: Response) => {    

    try {

        const name = req.body.name.toUpperCase();

        const categoryDB = await CategoryModel.findOne({ name });

        if (categoryDB) {
            return res.status(400).json({
                msg: `La categoría ${ categoryDB.name } ya existe`
            });
        }

        const category: ICategory = new CategoryModel({
            name,
            user: req.user._id
        });

        await category.save();

        return res.status(201).json({
            category
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }

};

export const putCategory = async (req: Request, res: Response) => {    

    try {

        return res.status(200).json({
            msg: 'Category put'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }

};

export const deleteCategory = async (req: Request, res: Response) => {    

    try {

        return res.status(200).json({
            msg: 'Category delete'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }

};