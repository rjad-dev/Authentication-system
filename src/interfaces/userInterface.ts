import * as Sequelize from 'sequelize';
import { UserStatusEnum } from "../enums/userEnum";

export interface InputUserInterface {
    name: string;
    email: string;
    password: string;
    verificationCode: number;
}

export interface UserInterface extends InputUserInterface {
    id: number;
    status: UserStatusEnum;
    verificationCode: number;
    isVerified: boolean;
    // created_at: Date;
    // updated_at: Date;
    // deleted_at?: Date;
}

export interface UserCreationInterface extends Sequelize.Optional<UserInterface, 'id'> {}

export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
  UserInterface { }