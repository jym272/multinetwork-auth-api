import { Model } from 'sequelize';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public token: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
