module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registrations', 'price', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('registrations', 'price');
  },
};
