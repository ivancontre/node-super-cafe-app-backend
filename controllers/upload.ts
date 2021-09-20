import { Request, Response} from 'express';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';

import { moveFile } from '../helpers';
import { IProduct, IUser, ProductModel, UserModel } from '../models';

export const upload = async (req: Request, res: Response) => {

    try {

        const file = req.files?.file as UploadedFile;
        const fileName = await moveFile(file as UploadedFile, ['png', 'jpg', 'jpeg', 'gif'], 'images');

        return res.json({
            fileName
        });        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const updateImage = async (req: Request, res: Response) => {

    try {

        const { collection, id } = req.params;

        let model: IUser | IProduct | null;

        switch (collection) {
            case 'users':

                model = await UserModel.findById(id);

                if (!model) {
                    return res.status(400).json({
                        msg: `El usuario con id ${ id } no existe`
                    });
                }

                break;

            case 'products':

                model = await ProductModel.findById(id);

                if (!model) {
                    return res.status(400).json({
                        msg: `El producto con id ${ id } no existe`
                    });
                }
            
                break;
        
            default:
                return res.status(400).json({
                    msg: 'Debe indicar una colección'
                });
        }

        if (model.img) {

            const imagePath = path.join(__dirname, '../uploads', collection, model.img);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

        }

        const file = req.files?.file as UploadedFile;

        const fileName = await moveFile(file, ['png', 'jpg', 'jpeg', 'gif'], collection) as string;

        model.img = fileName;

        await model.save();

        return res.json(model);  
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const getImage =  async(req: Request, res: Response) => {

    try {
        const { collection, id } = req.params;

        let model: IUser | IProduct | null;

        switch (collection) {
            case 'users':

                model = await UserModel.findById(id);

                if (!model) {
                    return res.status(400).json({
                        msg: `El usuario con id ${ id } no existe`
                    });
                }

                break;

            case 'products':

                model = await ProductModel.findById(id);

                if (!model) {
                    return res.status(400).json({
                        msg: `El producto con id ${ id } no existe`
                    });
                }
            
                break;
        
            default:
                return res.status(400).json({
                    msg: 'Debe indicar una colección'
                });
        }

        if (model.img) {

            const imagePath = path.join(__dirname, '../uploads', collection, model.img);

            if (fs.existsSync(imagePath)) {
                return res.sendFile(imagePath)
            }

        }

        const noImagePath = path.join(__dirname, '../assets', 'no-image.jpg');

        return res.sendFile(noImagePath);  

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }
};