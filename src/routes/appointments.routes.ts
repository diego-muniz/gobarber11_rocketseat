import { Router } from "express";
import { parseISO } from "date-fns";
import CreateAppointmentService from "../services/CreateAppointmentService";
import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
