import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

import { Authenticate, Validator } from "../../middlewares";
import {
  logIn,
  resendVerificationCode,
  signUp,
  verifyAccount,
} from "../../validators";
import { InputUserInterface } from "../../interfaces";
import { transporter } from "../../middlewares";
import { UserService } from "../../services";
import { UserStatusEnum } from "../../enums";
import { saltRounds } from "../../config";

export class AuthController {
  public constructor() {}

  static async signUp(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body as InputUserInterface;
    const verificationCode = crypto.randomInt(10000, 99999);
    Validator.check(signUp, { name, email, password });

    await new UserService().create({
      name: name,
      email: email,
      password: await bcrypt.hash(password, saltRounds),
      verificationCode: verificationCode,
    });

    try {
      await transporter.sendMail({
        to: email,
        subject: "Verification code",
        html: `Your verification code is <b>${verificationCode}<b>`,
      });
    } catch (err: any) {
      console.error(err.message);
    }

    return res.status(200).json({
      message: "User registered successfully.",
    });
  }

  static async verifyAccount(req: Request, res: Response): Promise<Response> {
    const { email, inputVerificationCode } = req.body;
    Validator.check(verifyAccount, { email, inputVerificationCode });

    const user = await new UserService().findOne({ email: email });
    if (!user) {
      throw new Error(`Email ${email} does not exists.`);
    }
    if (user.isVerified) {
      throw new Error("Your account is already verified.");
    }
    if (user.verificationCode != inputVerificationCode) {
      throw new Error(`Invalid verification code.`);
    }
    await new UserService().updateOne({
      id: user.id,
      input: {
        status: UserStatusEnum.verified,
        isVerified: true,
        verificationCode: null,
      },
    });
    return res.status(200).json({
      message: "Your account is verified successfully.",
    });
  }

  static async resendVerificationCode(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { email } = req.body;
    const userExists = await new UserService().findOne({ email: email });
    Validator.check(resendVerificationCode, { email });

    if (!userExists) {
      throw new Error(`Email ${email} does not exists`);
    }
    if (userExists.isVerified) {
      throw new Error(`Your account is already verified`);
    }
    const updateVerificationCode = crypto.randomInt(10000, 99999);
    try {
      await transporter.sendMail({
        to: email,
        subject: "Verification code",
        html: `Your verification code is <b>${updateVerificationCode}<b>`,
      });
    } catch (err: any) {
      console.error(err.message);
    }

    await new UserService().updateOne({
      id: userExists.id,
      input: { verificationCode: updateVerificationCode },
    });
    return res.status(200).json({
      message: "New verification code is sent to your mail.",
    });
  }

  static async logIn(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    Validator.check(logIn, { email, password });

    const userExists = await new UserService().findOne({ email: email });
    if (!userExists) {
      throw new Error(`User does not exists`);
    }
    if (!userExists.isVerified) {
      return res.status(200).json({
        message: "You are not verified, please verify your account and log in.",
      });
    }
    const matchPassword = await bcrypt.compare(password, userExists.password);
    if (!matchPassword) {
      throw new Error(`Invalid password`);
    }

    const accessToken = await Authenticate.generateAccessToken(userExists);

    return res.status(200).json({
      message: "Logged in successfully",
      token: {
        access: accessToken,
      },
    });
  }
}
