const fs = require('fs');
require('dotenv').config();

let html = fs.readFileSync('index.html', 'utf8');

html = html
  .replace('__FIREBASE_API_KEY__',      process.env.FIREBASE_API_KEY)
  .replace('__FIREBASE_AUTH_DOMAIN__',  process.env.FIREBASE_AUTH_DOMAIN)
  .replace('__FIREBASE_DATABASE_URL__', process.env.FIREBASE_DATABASE_URL)
  .replace('__FIREBASE_PROJECT_ID__',   process.env.FIREBASE_PROJECT_ID);

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('✅ Build complete');