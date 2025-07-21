const express = require('express');
const router = express.Router();
const careGroupController = require('../controllers/careGroupController');
const userAuth = require('../middleware/userauth');

// Create Group & Add Creator
router.post('/caregroups', userAuth, careGroupController.createCareGroup);

// Add Member to Group
router.post('/caregroups/:groupId/add-member', userAuth, careGroupController.addMember);

// Get All Members of Group
router.get('/caregroups/:groupId/members', userAuth, careGroupController.getMembers);

// Get Care Groups by User
router.get('/my-caregroups', userAuth, careGroupController.getCareGroupsByUser);

module.exports = router;

