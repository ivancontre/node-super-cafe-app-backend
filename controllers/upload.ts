import { Request, Response} from 'express';
import { UploadedFile } from 'express-fileupload';

import { moveFile } from '../helpers';

export const upload = async (req: Request, res: Response) => {

    try {    

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            return res.status(400).json({
                msg: 'No hay archivos para subir'
            });
        }

        const fileName = await moveFile(req.files.file as UploadedFile, ['png', 'jpg', 'jpeg', 'gif'], '');

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