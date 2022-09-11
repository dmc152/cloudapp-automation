const env = process.env.ENVIRON ? process.env.ENVIRON : 'prod';

const config = {
  prod: {
    url: process.env.URL ? process.env.URL : 'https://getcloudapp.com',
    email: process.env.ACCOUNT_EMAIL ? process.env.ACCOUNT_EMAIL : 'daniel23ni14@gmail.com',
    password: process.env.ACCOUNT_PW ? process.env.ACCOUNT_PW : 'P@ssw0rd20$'
  }
};

module.exports = config[env];
