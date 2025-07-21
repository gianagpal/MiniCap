import CareGroup from '../Model/careGroup.js';
import CareGroupMember from '../Model/careGroupMember.js';

// POST /api/caregroups
const createCareGroup = async (req, res) => {
  try {
    const { groupName, groupDescription } = req.body;

    const group = await CareGroup.create({
      groupName,
      groupDescription,
      createdBy: req.user._id
    });

    await CareGroupMember.create({
      careGroupId: group._id,
      userId: req.user._id,
      role: 'FamilyMember'
    });

    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/caregroups/:groupId/add-member
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

// GET /api/caregroups/:groupId/members
const getMembers = async (req, res) => {
  try {
    const members = await CareGroupMember.find({ careGroupId: req.params.groupId }).populate('userId');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/caregroups/my-caregroups
const getCareGroupsByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const memberships = await CareGroupMember.find({ userId }).populate('careGroupId');

    const careGroups = memberships.map(member => member.careGroupId);

    res.status(200).json({ careGroups });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch care groups', details: error.message });
  }
};

// ✅ Export all as default object
export default {
  createCareGroup,
  addMember,
  getMembers,
  getCareGroupsByUser
};
