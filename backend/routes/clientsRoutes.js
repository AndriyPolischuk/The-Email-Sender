const express = require('express');

const router = express.Router();

const {
  searchForClients,
  getClientById,
  addProject,
  editProject,
} = require('../controllers/clientsController');

router.post('/searchForClients', searchForClients);
router.post('/addProject', addProject);
router.post('/editProject', editProject);
router.get('/getClientById/:clientId', getClientById);

module.exports = router;
