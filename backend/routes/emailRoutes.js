const express = require('express');

const router = express.Router();

const {
  sendEmails,
  searchForLeads,
  stopSendingAllLeads,
  resubmitAllLeads,
  stopSendingOneLead,
  resubmitOneLead,
  makeClient,
} = require('../controllers/emailController');

router.post('/sendEmails', sendEmails);
router.post('/searchForLeads', searchForLeads);
router.post('/stopSendingAllLeads', stopSendingAllLeads);
router.post('/resubmitAllLeads', resubmitAllLeads);
router.post('/stopSendingOneLead', stopSendingOneLead);
router.post('/resubmitOneLead', resubmitOneLead);
router.post('/makeClient', makeClient);

module.exports = router;
