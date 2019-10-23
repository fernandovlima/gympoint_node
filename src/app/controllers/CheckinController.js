import { subDays } from 'date-fns';
import Op from 'sequelize';

import Checkin from '../models/Ckeckin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { studentId } = req.params;
    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId,
      },
      order: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attibutes: ['name', 'email'],
        },
      ],
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { studentId } = req.params;

    const checkinExists = await Checkin.findOne({
      where: {
        student_id: studentId,
        created_at: new Date(),
      },
    });

    if (checkinExists) {
      return res.status(401).json({ error: 'Checkin already done' });
    }

    try {
      const pastDays = subDays(new Date(), 7);
      const verifyCheckins = await Checkin.findAll({
        where: {
          student_id: studentId,
          created_at: { [Op.between]: [pastDays, new Date()] },
        },
      });

      const checkins = await Checkin.create({
        student_id: studentId,
      });

      return res.json(checkins);
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new CheckinController();
