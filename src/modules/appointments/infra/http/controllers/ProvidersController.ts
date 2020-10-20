import {Request,Response} from 'express';
import {container} from 'tsyringe';
import {parseISO} from 'date-fns';
import {classToClass} from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response>{
        try{
            const user_id = request.user.id;
    
            const listProvidersService = container.resolve(ListProvidersService);
            
            const providers = await listProvidersService.execute({user_id});
            
            return response.json(classToClass(providers));
        }catch(err){
            return response.status(400).json({error: err.message});
        }
    }
}