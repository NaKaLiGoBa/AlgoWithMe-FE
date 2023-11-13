const localHostURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8080'
    : 'https://k881facf0dd88a.user-app.krampoline.com';

export { localHostURL };
