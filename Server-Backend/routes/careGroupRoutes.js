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

// Get Care Groups by User
router.get('/my-caregroups', userAuth, careGroupController.getCareGroupsByUser);

export default router;
 