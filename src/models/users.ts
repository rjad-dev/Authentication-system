
import { Database } from "../config";
import { UserModelInterface } from "../interfaces";
import { UserStatusEnum } from "../enums/userEnum";
import { DataTypes } from "sequelize";

const sequelize = Database.sequelize

const User = sequelize.define<UserModelInterface>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        UserStatusEnum.verified,
        UserStatusEnum.unverified
      ),
    },
    verificationCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [5, 5],
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        name: "users_email",
        fields: ["email"],
        where: {
          deletedAt: null,
        },
      },
      {
        unique: true,
        name: "users_verification_code",
        fields: ["verification_code"],
        where: {
          deletedAt: null,
        },
      },
    ],
  }
);

export default User
