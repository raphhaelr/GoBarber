import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, provider_id } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
