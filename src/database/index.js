import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Registration from '../app/models/Registration';
import Plan from '../app/models/Plan';
import HelpOrder from '../app/models/HelpOrder';
import Checkin from '../app/models/Ckeckin';
import databaseConfig from '../config/database';

const models = [User, Student, HelpOrder, Plan, Checkin, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
