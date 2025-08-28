// test-env.js
import dotenv from 'dotenv';
dotenv.config();
console.log('EMAIL:', process.env.TEST_EMAIL, 'PASSWORD:', process.env.TEST_PASSWORD);