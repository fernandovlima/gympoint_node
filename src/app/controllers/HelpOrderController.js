import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

// import Mail from '../../lib/Mail';

class HelpOrderController {
  async index(req, res) {
    const { studentId } = req.params;

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    try {
      const helpOdersByStudent = await HelpOrder.findAll({
        where: {
          student_id: studentId,
        },
      });

      return res.json(helpOdersByStudent);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    // valida se o schema está preenchido corretamente
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Fields validation fails' });
    }
    const { studentId } = req.params;

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const { question } = req.body;

    try {
      const helpOrder = await HelpOrder.create({
        question,
        student_id: studentId,
      });

      return res.json(helpOrder);
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    // valida se o schema está preenchido corretamente
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Fields validation fails' });
    }
    const { helpId } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(helpId);

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help Order does not exists' });
    }

    try {
      const helpOrderAnswered = await helpOrder.update({
        answer,
        answer_at: new Date(),
      });

      return res.json(helpOrderAnswered);
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new HelpOrderController();
