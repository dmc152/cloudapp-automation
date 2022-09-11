import { Selector, t } from "testcafe";
import path from "path";
import { refreshPage } from "../../utils/clientFunctions.util";
import {
  areSameImages,
  downloadImageFromS3,
  generateImageName,
  getScreenshotPath,
} from "../../utils/images.util";

const PROFILE_PICTURES = {
  BLANK: { path: path.resolve(__dirname, "./profilePictures/blankAvatar.png") },
  CLOUD_APP: {
    path: path.resolve(__dirname, "./profilePictures/cloudAppAvatar.png"),
    screenshotPath: path.resolve(
      __dirname,
      "./profilePictures/screenShotCloudAppAvatar.png"
    ),
  },
};

const AVATAR_CAPTURE_METHOD = {
  SCREENSHOT: "screenshot",
  S3_DOWNLOAD: "s3Download",
};

class Profile {
  constructor() {
    this.inputChooseFile = Selector("#user_avatar");
    this.btnSubmit = Selector("input").withAttribute(
      "data-testid",
      "onboarding-submit-about-you-form"
    );
    this.imgAvatar = Selector("#avatar.lg");
  }

  async changeAvatar(profilePicture) {
    await t
      .setFilesToUpload(this.inputChooseFile, profilePicture.path)
      .click(this.btnSubmit);
    await refreshPage();
  }

  getS3SUrl(styleString) {
    // This gets the Style element raw string
    const s3Url = styleString.substring(
      styleString.indexOf('"') + 1,
      styleString.lastIndexOf('"')
    );
    // Testcafe adds a proxy (http://localhost:1337 into the url which has to be removed.)
    return s3Url.substring(s3Url.indexOf("https"));
  }

  /**
   * Takes a screenshot of the specific avatar element
   * @param {String} testName - Test Case Name used to name the screenshot
   * @returns {String} - Path of the screenshot taken
   */
  async takeAvatarScreenshot(testName) {
    const imageName = generateImageName(testName);
    const screenshotPath = getScreenshotPath(imageName);
    await t.takeElementScreenshot(this.imgAvatar, imageName);
    return screenshotPath;
  }

  /**
   * Downloads/Captures a profile avatar using a method, (Screenshot or Downloading the image through S3 Bucket )
   * and compares it with a local image.
   * 
   * @param {(screenshot|s3Download)} avatarCaptureMethod - Any option of the AVATAR_CAPTURE_METHOD Enum, will capture the profile avatar using this method.
   * @param {Object} profilePicture - A key of the PROFILE_PICTURES Object, used to compare captured avatar against this picture.
   * @param {String} testName - Test Case Name, will be used to name downloads/screenshots;
   * @returns {Boolean} - true if image captured with method is the same one than the profile picture in file.
   */
  async compareAvatarWithPicture(
    avatarCaptureMethod,
    profilePicture,
    testName
  ) {
    let downloadedAvatarPath;
    let imageToComparePath;
    switch (avatarCaptureMethod) {
      case AVATAR_CAPTURE_METHOD.SCREENSHOT:
        downloadedAvatarPath = await this.takeAvatarScreenshot(testName);
        imageToComparePath = profilePicture.screenshotPath;

      case AVATAR_CAPTURE_METHOD.S3_DOWNLOAD:
        const styleString = await this.imgAvatar.getAttribute("style");
        downloadedAvatarPath = await downloadImageFromS3(
          this.getS3SUrl(styleString),
          testName
        );
        imageToComparePath = profilePicture.path;
    }
    return await areSameImages(downloadedAvatarPath, imageToComparePath);
  }
}

export { Profile, PROFILE_PICTURES, AVATAR_CAPTURE_METHOD };
