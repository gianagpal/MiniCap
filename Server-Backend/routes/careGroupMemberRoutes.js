import express from 'express';
import userAuth from '../middleware/userauth.js';
import careGroupMemberController from '../controllers/careGroupMemberController.js';

const router = express.Router();

// Add a member to a group
router.post('/:groupId/add-member', userAuth, careGroupMemberController.addMember);

// Get all members of a group
router.get('/:groupId/members', userAuth, careGroupMemberController.getMembers);

// Edit role of a group member (admin only)
router.put('/:groupId/member/:memberId', userAuth, careGroupMemberController.editMemberRole);

// Remove a member from a group (admin only)
router.delete('/:groupId/member/:memberId', userAuth, careGroupMemberController.removeMember);

export default router;
