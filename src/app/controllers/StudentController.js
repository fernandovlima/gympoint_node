import * as Yup from 'yup';
import Students from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      height: Yup.number().required(),
      weight: Yup.number().required(),
    });

    // valida se o schema está preenchido corretamente
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    // procura se student ja existe
    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists !' });
    }

    // criação de student
    const { name, email, age, weight, height } = await Students.create(
      req.body
    );

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });
    // valida se o schema está preenchido corretamente
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists !' });
    }
    // update student
    const { name, email, age, weight, height } = await studentExists.update(
      req.body
    );

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
