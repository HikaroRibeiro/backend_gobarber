import {Request,Response} from 'express';
import {container} from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response>{
        try{
            const {provider_id,date} = request.body;
            const user_id = request.user.id;

            const createAppointmentService = container.resolve(CreateAppointmentsService);
            
            const appointment = await createAppointmentService.execute({
                date: date,
                provider_id,
                user_id
            });
            
            return response.json(appointment);
        }catch(err){
            return response.status(400).json({error: err.message});
        }
    }
}