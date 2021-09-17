import { Request, Response} from 'express';
import { Types } from 'mongoose';
import { UserModel } from '../models';

const allowedCollections = [
    'users',
    'products',
    'categories',
    'roles'
];

const searchUser = async (term: string, res: Response) => {

    const isMongoId = Types.ObjectId.isValid(term);

    if (isMongoId) {
        const user = await UserModel.findById(term);

        return res.status(200).json({
            results: user ? [ user ] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await UserModel.find({ 
        $or: [
            { name: regex }, 
            { email: regex }
        ],
        $and: [
            { status: true }
        ]
     });

    return res.status(200).json({
        results: users
    });



};

export const search = async (req: Request, res: Response) => {

    try {

        const { collection, term } = req.params;

        if (!allowedCollections.includes(collection)) {
            return res.status(400).json({
                msg: `Las colecciones permitidas son: ${allowedCollections.join(', ')}`
            });
        }

        switch (collection) {
            case 'users':

                await searchUser(term, res);               
                
                break;

            case 'products':
                
                break;

            case 'categories':
        
                break;

                
            default:

                break;
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }
    
};