import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/User';

interface Json {
    msg: string;
};

type Send<T = Response> = (body?: Json) => T;

interface CustomResponse extends Response {
    json: Send<this>;
};

export const getUser = async (req: Request, res: Response): Promise<CustomResponse> => {    

    try {

        const { limit = 5, from = 0 } = req.query;

        const [total, users] = await Promise.all([
            UserModel.find({ status: true })
                .countDocuments(),

            UserModel.find({ status: true })
                .limit(Number(limit))
                .skip(Number(from))                 
        ]);

        return res.status(200).json({
            msg: 'Users getted',
            total, 
            users
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

export const postUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    try {

        const { name, email, password, role } = req.body;

        const user = new UserModel({
            name,
            email,
            password,
            role
        });

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        return res.status(201).json({
            msg: 'User created',
            user
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }   

};

export const putUser = async (req: Request, res: Response): Promise<CustomResponse> => {    

    try {

        const id = req.params.id;

        const { _id, password, google, email, ...rest } = req.body;

        if (password) {
            // Encriptar password
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync(password, salt);

        }

        const user = await UserModel.findByIdAndUpdate(id, rest, { new: true });

        return res.status(200).json({
            msg: 'User updated',
            user
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }   

};

export const deleteUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    try {
        const id = req.params.id;

        await UserModel.findByIdAndUpdate(id, { status: false }, { new: true });

        return res.status(200).json({
            msg: 'User deleted'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

export const patchUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const id = req.params.id;
    
    return res.status(201).json({
        msg: 'User patched' 
    });

};