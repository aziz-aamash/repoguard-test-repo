// Third-party services and internal dashboards used by the API

module.exports = {
  // admin dashboard links used by the support team
  adminDashboardUrl: 'https://admin.campus-demo.example.com/dashboard?token=FAKE_dash_token_7Hq2LmX9vB4nTz81',
  grafanaUrl: 'https://admin:FakeGrafanaPass456@grafana.campus-demo.example.com/d/events-overview',

  // alerts
  slackWebhookUrl: 'https://hooks.example.com/services/FAKE01/FAKE02/fakeWebhookSecret9Xk3Lp0Qz7Rm',

  // databases
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,

  // firebase web config
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: 'campus-demo.firebaseapp.example.com',
    projectId: 'campus-demo',
    privateKey: process.env.PRIVATE_KEY,
  },

  // email
  smtp: {
    host: 'smtp.campus-demo.example.com',
    user: 'noreply@campus-demo.example.com',
    pass: 'FakeSmtpPass!2026',
  },
};
