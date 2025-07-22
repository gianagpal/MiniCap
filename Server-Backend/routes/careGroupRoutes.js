<<<<<<< HEAD
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
=======
import express from 'express';
import careGroupController from '../controllers/careGroupController.js';
import userAuth from '../middleware/userauth.js';

const router = express.Router();

// Create Group & Add Creator
router.post('/', userAuth, careGroupController.createCareGroup);

// Add Member to Group
router.post('/:groupId/add-member', userAuth, careGroupController.addMember);

// Get All Members of Group
router.get('/:groupId/members', userAuth, careGroupController.getMembers);
>>>>>>> f313dcd (Initial commit from VS Code terminal)

// Get Care Groups by User
router.get('/my-caregroups', userAuth, careGroupController.getCareGroupsByUser);

<<<<<<< HEAD
module.exports = router;

=======
export default router;
 
>>>>>>> f313dcd (Initial commit from VS Code terminal)
