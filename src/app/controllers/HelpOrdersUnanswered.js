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
}

export default new HelpOrdersUnanswered();
