import exceptionHandler from "../../middlewares/exceptionHandler";
import { RouterClass } from "../classes";
import { AuthController } from "../controllers";

export class AuthRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/sign-up")
      .post(exceptionHandler(AuthController.signUp));

    this.router
      .route("/verify-account")
      .post(exceptionHandler(AuthController.verifyAccount));

    this.router
      .route("/resend-verification-code")
      .post(exceptionHandler(AuthController.resendVerificationCode));
      
    this.router
      .route("/log-in")
      .post(exceptionHandler(AuthController.logIn));
  }
}
