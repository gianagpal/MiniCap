import CareGroup from '../Model/careGroup.js';
import CareGroupMember from '../Model/careGroupMember.js';
import User from '../Model/user.js';

// POST /api/caregroup-members/:groupId/add-member
const addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, role } = req.body;

    const member = await CareGroupMember.create({
      careGroupId: groupId,
      userId,
      role
    });

    res.status(201).json({ message: 'Member added', member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/caregroup-members/:groupId/members
const getMembers = async (req, res) => {
  try {
    const members = await CareGroupMember.find({ careGroupId: req.params.groupId }).populate('userId');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/caregroup-members/:groupId/member/:memberId
const editMemberRole = async (req, res) => {
  try {
    const { groupId, memberId } = req.params;
    const { role } = req.body;

    const group = await CareGroup.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Care group not found' });

    if (group.adminUser.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: 'Only admin can update roles' });
    }

    const member = await CareGroupMember.findById(memberId);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });

    member.role = role;
    await member.save();

    res.json({ success: true, message: 'Member role updated', member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/caregroup-members/:groupId/member/:memberId
const removeMember = async (req, res) => {
  try {
    const { groupId, memberId } = req.params;

    const group = await CareGroup.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Care group not found' });

    if (group.adminUser.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: 'Only admin can remove members' });
    }

    await CareGroupMember.findByIdAndDelete(memberId);

    res.json({ success: true, message: 'Member removed from care group' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  addMember,
  getMembers,
  editMemberRole,
  removeMember
};