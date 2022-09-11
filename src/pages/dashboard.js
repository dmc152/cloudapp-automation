import { Selector, t } from "testcafe";

class DashboardPage {
  constructor() {
    this.dropDownAvatar = Selector("#avatar");
    this.dropDownItemSettings = Selector("a").withText("Settings");
    this.anchorSettings = Selector("#profile");
  }

  async goToSettings() {
    await t
      .click(this.dropDownAvatar)
      .click(this.dropDownItemSettings)
      .expect(this.anchorSettings.exists)
      .ok();
  }
}

export default new DashboardPage();
