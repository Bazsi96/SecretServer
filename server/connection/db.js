require('dotenv/config');
const mongoose = require('mongoose');
const DB_URI = process.env.DB_CONNECTION;

function connect() {
   return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === 'test') {
         const Mockgoose = require('mockgoose').Mockgoose;
         const mockDB = new Mockgoose(mongoose);
         mockDB.prepareStorage()
            .then(() => {
               mongoose.connect(DB_URI, {
                     useNewUrlParser: true,
                     useUnifiedTopology: true
                  })
                  .then((res, err) => {
                     if (err) return reject(err);
                     resolve();
                  });
            });
      } else {
         mongoose.connect(DB_URI, {
               useNewUrlParser: true,
               useUnifiedTopology: true
            })
            .then((res, err) => {
               if (err) return reject(err);
               resolve();
            });
      }
   });
}

function close() {
   return mongoose.disconnect();
}

module.exports = {
   connect,
   close
};