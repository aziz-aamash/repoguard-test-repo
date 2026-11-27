// Third-party services and internal dashboards used by the API

module.exports = {
  // admin dashboard links used by the support team
  adminDashboardUrl: 'https://admin.campus-demo.example.com/dashboard?token=FAKE_dash_token_7Hq2LmX9vB4nTz81',
  grafanaUrl: 'https://admin:FakeGrafanaPass456@grafana.campus-demo.example.com/d/events-overview',

  // alerts
  slackWebhookUrl: 'https://hooks.example.com/services/FAKE01/FAKE02/fakeWebhookSecret9Xk3Lp0Qz7Rm',

  // databases
  mongoUri: 'mongodb+srv://campusAdmin:FakeMongoPass789@cluster0.example.mongodb.net/campus?retryWrites=true',
  redisUrl: 'redis://default:FakeRedisPass321@cache.campus-demo.example.com:6379',

  // firebase web config
  firebase: {
    apiKey: 'FAKE-firebase-api-key-Xq8Lm2Zt7Vb4Nc9Rw3Yd6Hk1Pa5Js0',
    authDomain: 'campus-demo.firebaseapp.example.com',
    projectId: 'campus-demo',
    privateKey: 'FAKE_private_key_8f3a91c2d4e65b7a0f1c9d3e2b4a6c8d',
  },

  // email
  smtp: {
    host: 'smtp.campus-demo.example.com',
    user: 'noreply@campus-demo.example.com',
    pass: 'FakeSmtpPass!2026',
  },
};
