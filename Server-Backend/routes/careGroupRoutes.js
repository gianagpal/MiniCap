import express from 'express';
import careGroupController from '../controllers/careGroupController.js';
import userAuth from '../middleware/userauth.js';

const router = express.Router();

// Create Group & Add Creator
router.post('/', userAuth, careGroupController.createCareGroup);



// Update care group
router.put('/:groupId', userAuth, careGroupController.editCareGroup);

// Delete care group
router.delete('/:groupId', userAuth, careGroupController.deleteCareGroup);


// Get Care Groups by User
router.get('/my-caregroups', userAuth, careGroupController.getCareGroupsByUser);

export default router;

