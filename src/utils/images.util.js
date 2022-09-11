import Axios from "axios";
import path from "path";
import { t } from "testcafe";
const fs = require("fs");

/**
 *  Will evaluate if two images are the same based on the base64 representation of them
 *
 * @param {String} firstImagePath - Path of the first image to be compared
 * @param {String} secondImagePath - Path of the second image to be compared
 * @returns {Boolean} - True if images match, false if they do not.
 */
const areSameImages = async (firstImagePath, secondImagePath) => {
  await t.wait(3 * 1000);
  const original = await fs.promises.readFile(firstImagePath);
  const uploaded = await fs.promises.readFile(secondImagePath);
  const bufferComparison = Buffer.compare(original, uploaded);
  return bufferComparison === 0;
};

/**
 * Generates an Image name with a convention to easily match a screenshot with a test case.
 * @param {String} testName Test Case Name
 * @returns {String} - image name with PNG extension
 */
const generateImageName = (testName) => {
  const regex = /\[(TC\d+)\]/;
  const testId = regex.exec(testName)[1];
  return `e2e-${testId || "TC000"}-${new Date().getTime()}.png`;
};

const getScreenshotPath = (screenshotName) => {
  return path.resolve(__dirname, `../screenshots/${screenshotName}`);
};

/**
 *
 * @param {String} s3Url - S3 Bucket URL
 * @param {String} testName - Test Case Full Name
 * @returns
 */
const downloadImageFromS3 = async (s3Url, testName) => {
  const imagePath = getScreenshotPath(generateImageName(testName));
  const fileWriter = fs.createWriteStream(imagePath);
  const res = await Axios({
    url: s3Url,
    method: "GET",
    responseType: "stream",
  });
  res.data.pipe(fileWriter);
  return new Promise((resolve, reject) => {
    fileWriter.on("finish", resolve(imagePath));
    fileWriter.on("error", reject);
  });
};

export {
  areSameImages,
  downloadImageFromS3,
  generateImageName,
  getScreenshotPath,
};
