import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default class ApppointmentsRepository
  implements IAppointmentsRepository {
  private appointmentsRepository: Repository<Appointment>;

  constructor() {
    this.appointmentsRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { date },
    });

    return appointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create({
      date,
      provider_id,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}
