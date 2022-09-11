import { Selector, t } from "testcafe";

class LoginPage {
  constructor() {
    this.btnLogIn = new Selector(".jet-menu-title").withText("Log in");

    // Regular Login Elements
    this.txtEmail = new Selector("#email");
    this.txtPassword = new Selector("#password");
    this.btnSignIn = new Selector("input").withAttribute(
      "data-testid",
      "regular-login-submit"
    );
    this.anchorProfileAvatar = new Selector("#avatar");
  }

  async logInWithCreds(email, password) {
    await t
      .maximizeWindow()
      .click(this.btnLogIn)
      .expect(this.txtEmail.exists)
      .ok();
    await t
      .typeText(this.txtEmail, email)
      .typeText(this.txtPassword, password)
      .click(this.btnSignIn)
      .expect(this.anchorProfileAvatar.exists)
      .ok();
  }
}

export default new LoginPage();
