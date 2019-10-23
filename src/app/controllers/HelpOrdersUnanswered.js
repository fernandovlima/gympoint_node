import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';

class HelpOrdersUnanswered {
  async index(req, res) {
    try {
      const helpOdersUnanswered = await HelpOrder.findAll({
        where: {
          answer_at: null,
        },
        order: ['created_at'],
      });

      return res.json(helpOdersUnanswered);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
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
      const helpOrderAnswered = await helpOrder.post({
        answer,
        answer_at: new Date(),
      });

      return res.json(helpOrderAnswered);
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new HelpOrdersUnanswered();
