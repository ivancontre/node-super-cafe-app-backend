import { Request, Response} from 'express';

interface Json {
    msg: string;
};

type Send<T = Response> = (body?: Json) => T;

interface CustomResponse extends Response {
    json: Send<this>;
};

export const getUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const { q, name } = req.query;

    return res.status(201).json({
        msg: 'User getted',
        q,
        name
    });

};

export const postUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    return res.status(201).json({
        msg: 'User created' 
    });

};

export const putUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const id = req.params.id;

    return res.status(201).json({
        msg: 'User updated' 
    });

};

export const deleteUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const id = req.params.id;

    return res.status(201).json({
        msg: 'User deleted' 
    });

};

export const patchUser = async (req: Request, res: Response): Promise<CustomResponse> => {

    const id = req.params.id;
    
    return res.status(201).json({
        msg: 'User patched' 
    });

};