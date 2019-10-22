import * as Yup from 'yup';
import { addMonths, parseISO, startOfHour } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.number().required(),
    });
    // valida se o schema está preenchido corretamente
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Fields validation fails' });
    }

    const { plan_id, start_date, student_id } = req.body;
    // busca se existe uma registration cadastrada
    const registration = await Registration.findByPk(student_id);

    if (registration) {
      return res.status(401).json({ error: 'Registration already exists' });
    }
    // busca se existe um Student cadastrada
    const student = await Student.findByPk(student_id);
    // check se Registrations já existe
    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }
    // Find Plan
    const plan = await Plan.findByPk(plan_id);

    const hourStart = startOfHour(parseISO(start_date));
    const endDate = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.duration * plan.price;

    const registrations = await Registration.create({
      start_date: hourStart,
      end_date: endDate,
      student_id,
      plan_id,
      price: finalPrice,
    });

    return res.json(registrations);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({
      message: 'ok',
    });
  }
}

export default new RegistrationController();