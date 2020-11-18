import Appointment from "../models/Appointment";
import { startOfHour } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { getCustomRepository } from "typeorm";

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepositoy = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepositoy.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentsRepositoy.create({
      provider_id: provider_id,
      date: appointmentDate,
    });

    await appointmentsRepositoy.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
