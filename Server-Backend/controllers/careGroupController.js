import CareGroup from '../Model/careGroup.js';
import CareGroupMember from '../Model/careGroupMember.js';

// POST /api/caregroups
const createCareGroup = async (req, res) => {
  try {
    const { groupName, groupDescription } = req.body;

    const group = await CareGroup.create({
      groupName,
      groupDescription,
      adminUser: req.user._id,
      createdAt: new Date()
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

// PUT /api/caregroups/:groupId
const editCareGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { groupName, groupDescription } = req.body;

    const group = await CareGroup.findById(groupId);

    if (!group) {
      return res.status(404).json({ success: false, message: 'Care group not found' });
    }

    // Only allow adminUser to edit
    if (group.adminUser.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to edit this group' });
    }

    if (groupName) group.groupName = groupName;
    if (groupDescription) group.groupDescription = groupDescription;

    await group.save();

    res.json({ success: true, message: 'Care group updated', group });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// DELETE /api/caregroups/:groupId
const deleteCareGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await CareGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Care group not found' });
    }

    if (group.adminUser.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this group' });
    }

    // Delete the group
    await CareGroup.findByIdAndDelete(groupId);

    // Optional: delete related members
    await CareGroupMember.deleteMany({ careGroupId: groupId });

    res.json({ success: true, message: 'Care group and members deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
  editCareGroup,
  deleteCareGroup,
  getCareGroupsByUser
};
