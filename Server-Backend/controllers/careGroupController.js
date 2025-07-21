const CareGroup = require('../Model/careGroup');
const CareGroupMember = require('../Model/careGroupMember');

// POST /caregroups
exports.createCareGroup = async (req, res) => {
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

// POST /caregroups/:groupId/add-member
exports.addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, role } = req.body;

    const member = await CareGroupMember.create({
      careGroupId: groupId,
      userId,
      role
    });

    res.status(201).json({ message: 'Member added', member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /caregroups/:groupId/members
exports.getMembers = async (req, res) => {
  const members = await CareGroupMember.find({ careGroupId: req.params.groupId }).populate('userId');
  res.status(200).json(members);
};

// GET /caregroups/user
exports.getCareGroupsByUser = async (req, res) => {
  try {
    const userId = req.user._id; // if using auth middleware
    // OR: const userId = req.params.userId;

    const memberships = await CareGroupMember.find({ userId }).populate('careGroupId');

    // Extract the actual care group details
    const careGroups = memberships.map(member => member.careGroupId);

    res.status(200).json({ careGroups });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch care groups', details: err.message });
  }
};

