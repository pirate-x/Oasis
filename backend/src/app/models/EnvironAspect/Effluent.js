import Sequelize, { Model } from 'sequelize';

class Effluent extends Model {
  static init(sequelize) {
    super.init(
      {
        kind: Sequelize.STRING,
        source: Sequelize.STRING,
        flow: Sequelize.FLOAT,
        treatment: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        capacity: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
  }
}

export default Effluent;
