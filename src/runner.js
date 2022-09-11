const createTestCafe = require("testcafe");

// Default way of running tests will be in headfull mode
// unless adding BROWSER=false
const getBrowsers = () => {
  let browsers = [];
  if (process.env.BROWSER && process.env.BROWSER === 'false') {
    browsers.push("chrome:headless");
  } else {
    browsers.push("chrome");
  }  
  return browsers;
};

(async () => {
  const testcafe = await createTestCafe("localhost", 1337, 1338);

  try {
    const browsers = getBrowsers(process.env);
    const runner = testcafe.createRunner();
    const failed = await runner
      .src(["src/tests/settings"])
      .browsers(browsers)
      .screenshots({ path: "src/screenshots/" })
      .run({ skipJsErrors: true });

    console.log(`Tests failed: ${failed}`);
  } finally {
    await testcafe.close();
    process.exit(0);
  }
})();
