# Cloud App Automation

## Challenge summary

*Write test automation code that goes to our website (https://getcloudapp.com/)
And does the following steps:*
- Sign up
- Log out
- Log in
- Go to settings -> profile and update the avatar

While I was updating profiles manually to get familiar with the tool, I noticed that changing the avatar does not update immediately the Web UI, it takes ~1m to display the updated the image.
Even tho it can be because of browser caching the style background of the avatar I decided to make two ways to validate the avatar has changed through Automation. 

1. Grab the S3 URL where the avatar is uploaded through the HTML attributes, download the image and compare it with the image we uploaded locally to make sure they match. This should guarantee that avatar was actually updated for the current user.

2. Take a screenshot of the avatar element right after changing the profile and compare it with a previously taken screenshot of that same element (using the automation framework). I really thought I was going to be able to catch the "delay" and this test would fail, but to my surprise, when the framework takes the screenshot the UI seems to update and the new image is rendered and the test passes.

## Dependencies

* [Node.js](https://nodejs.org)  ( This was tested using Node LTS v16)
* [Docker](https://www.docker.com/) - (Optional) only if you want to use Docker to run this project.

## Usage

```bash

 # Using these commands should be enough, project has a dummy account 
 # which I intend to keep alive for a couple of days.
 cd cloudapp-automation
 npm install
 npm run tests
 
# To run in headless browser use BROWSER environment variable
BROWSER=false npm run tests

# Adding Credentials for cloudapp, (can also add them directly to src/config.js)
ACCOUNT_EMAIL=<cloudAppEmail> ACCOUNT_PW=<cloudAppPw> npm run tests
```

### Run Tests using Docker


```bash
# Installing Node dependencies is still required 
# until we generate our own Docker image with dependencies in it.
cd cloudapp-automation && npm install && cd ..

docker run -v $(pwd)/cloudapp-automation:/tests -it testcafe/testcafe chromium /tests/src/tests/settings --screenshots /tests/src/screenshots

```

