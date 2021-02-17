const app = require('./index');
const db = require('./connection/db');
const PORT = process.env.PORT || 5555;

db.connect()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Secret Server API listening on: ${PORT} port`);
      });
   });