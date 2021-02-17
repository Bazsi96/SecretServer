const express = require('express');
const router = express.Router();
const Secret = require('../models/Secret');
const {
   minutesDifferent
} = require('../utils/mindiff');
const createHash = require('hash-generator');
const hashLength = 5;

// Get a secret
router.get('/:hash', async (req, res) => {
   try {

      // Decrement the remainingViews value
      await Secret.updateOne({
         hash: req.params.hash
      }, {
         $inc: {
            remainingViews: -1
         }
      });

      // Get a secret from db
      const secret = await Secret.findOne({
         hash: req.params.hash
      });

      if (secret != null) {
         // Calculate the different
         const differentInMinutes = minutesDifferent(new Date(), new Date(secret.createdAt));

         if (secret.remainingViews == 0) {
            res.json({
               message: "You have reached the maximum number of views available!"
            });
         } else if (secret.expiresAt == 0 && secret.remainingViews != 0) {
            res.json(secret);
         } else if (differentInMinutes >= secret.expiresAt) {
            res.json({
               message: "The secret is expired!"
            });
         } else {
            res.json(secret);
         }
      } else {
         res.json({
            message: "Invalid hash!"
         });
      }
   } catch (error) {
      res.json({
         message: error
      });
   }
});

// Add new secret
router.post('/', async (req, res) => {
   const secret = new Secret({
      hash: createHash(hashLength),
      secretText: req.body.secret,
      remainingViews: req.body.expireAfterViews,
      expiresAt: req.body.expireAfter,
      createdAt: new Date(),
   });
   try {
      const savedSecret = await secret.save();
      res.json(savedSecret);
   } catch (error) {
      res.json({
         message: error
      });
   }
});


module.exports = router;