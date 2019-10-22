import Sequelize from 'sequelize';
import User from '../app/models/User';
import Students from '../app/models/Students';
import Plan from '../app/models/Plan';
import HelpOrder from '../app/models/HelpOrder';
import Checkin from '../app/models/Ckeckin';
import databaseConfig from '../config/database';

const models = [User, Students, HelpOrder, Plan, Checkin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
