import { NextFunction, Request, Response} from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserModel } from '../models/User';

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    // x-token viene en el header

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const payload: JwtPayload = verify(token, process.env.SECRET_JWT_SEED as string) as JwtPayload;
        
        const { id, name } = payload;

        const user = await UserModel.findOne({ _id: id }).select({ "email": 1, "_id": 0});
        
        // es se pasará por next a la siguiente funcion
        req.body.id = id;
        req.body.name = name;   
        req.body.email = user ? user.email : undefined;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }

    next();
};