require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

app.listen(2000, () => {
    console.log('Server is running on 2000');
});
