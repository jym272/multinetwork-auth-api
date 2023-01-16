import { DataTypes, Sequelize } from 'sequelize';
import { User } from '@db/models';

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        field: 'email'
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'password'
      },
      token: {
        type: DataTypes.STRING(64),
        allowNull: true,
        field: 'token'
      }
    },
    {
      sequelize,
      tableName: 'user'
    }
  );
};
