import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { helpOrderAnswered } = data;

    // sending mail
    await Mail.sendMail({
      to: `${helpOrderAnswered.student.name} <${helpOrderAnswered.student.email}> `,
      subject: 'Resposta de auxílio',
      template: 'helpAnswered',
      context: {
        student: helpOrderAnswered.student.name,
        question: helpOrderAnswered.question,
        answer: helpOrderAnswered.answer,
        answer_at: format(
          parseISO(helpOrderAnswered.answer_at),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new HelpOrderAnswerMail();
