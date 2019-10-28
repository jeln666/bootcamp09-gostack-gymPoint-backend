import { Model } from 'sequelize';

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    return this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
  }
}

export default Checkin;
