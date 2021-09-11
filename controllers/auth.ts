import { Request, Response} from 'express';
import { compareSync } from 'bcryptjs';

import { UserModel } from '../models/User';
import { generateJWT } from '../helpers/jwt';

interface Json {
    msg: string;
};

type Send<T = Response> = (body?: Json) => T;

interface CustomResponse extends Response {
    json: Send<this>;
};

export const login = async (req: Request, res: Response): Promise<CustomResponse> => {

    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        // Verficar correo existe
        if (!user) {
            return res.status(400).json({
                msg: `Usuario y contraseña no son correctos`
            });
        }

        // Verficar status
        if (!user.status) {
            return res.status(400).json({
                msg: `Usuario y contraseña no son correctos`
            });
        }

        // Verficar passwords
        const validPassword = compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: `Usuario y contraseña no son correctos`
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id, user.name);




        return res.status(200).json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}