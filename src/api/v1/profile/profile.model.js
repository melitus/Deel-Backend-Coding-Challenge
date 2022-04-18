module.exports = (sequelize, Sequelize) => {
  class Profile extends Sequelize.Model {}

  Profile.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM('client', 'contractor'),
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};
