import loginPage from "../../pages/login";
import dashboard from "../../pages/dashboard";
import {
  Profile,
  PROFILE_PICTURES,
  AVATAR_CAPTURE_METHOD,
} from "../../pages/settings/accountProfile";
import config from "../../config";

const { email, password, url } = config;
const profilePage = new Profile();

fixture`Settings Profile Avatar`.page`${url}`
  .beforeEach(async (t) => {
    // Arrange
    await loginPage.logInWithCreds(email, password);
    await dashboard.goToSettings();
  })
  .afterEach(async (t) => {
    // Cleanup, we should always go back to BLANK picture after testing.
    await profilePage.changeAvatar(PROFILE_PICTURES.BLANK);
  });

test("[TC001] User Should be able to update Profile avatar (Validation through S3 Bucket content)", async (t) => {
  // Act
  await profilePage.changeAvatar(PROFILE_PICTURES.CLOUD_APP);
  const areImagesEqual = await profilePage.compareAvatarWithPicture(
    AVATAR_CAPTURE_METHOD.S3_DOWNLOAD,
    PROFILE_PICTURES.CLOUD_APP,
    t.testRun.test.name
  );
  // Assert
  await t.expect(areImagesEqual).eql(true);
});

test("[TC002] User Should be able to update Profile avatar (Validation through UI Screenshot)", async (t) => {
  // Act
  await profilePage.changeAvatar(PROFILE_PICTURES.CLOUD_APP);
  const areImagesEqual = await profilePage.compareAvatarWithPicture(
    AVATAR_CAPTURE_METHOD.SCREENSHOT,
    PROFILE_PICTURES.CLOUD_APP,
    t.testRun.test.name
  );
  // Assert
  await t.expect(areImagesEqual).eql(true);
});
