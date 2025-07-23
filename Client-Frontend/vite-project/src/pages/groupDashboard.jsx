import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GroupDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const groupId = location.state?.groupId;

  const [group, setGroup] = useState(null);
  const [memberEmail, setMemberEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [members, setMembers] = useState([]);
  const [originalMembers, setOriginalMembers] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('careGroups')) || [];
    const matchedGroup = storedGroups.find(g => g.id === groupId);
    if (matchedGroup) {
      setGroup(matchedGroup);
      setMembers(matchedGroup.members || []);
      setOriginalMembers(matchedGroup.members || []);
    }
  }, [groupId]);

  const updateGroupStorage = (updatedGroup) => {
    const storedGroups = JSON.parse(localStorage.getItem('careGroups')) || [];
    const updatedGroups = storedGroups.map(g => g.id === groupId ? updatedGroup : g);
    localStorage.setItem('careGroups', JSON.stringify(updatedGroups));
    setGroup(updatedGroup);
  };

  const handleAddMember = () => {
    if (!memberEmail || !selectedRole) return;
    const updatedMembers = [...members, { email: memberEmail, role: selectedRole }];
    setMembers(updatedMembers);
    setMemberEmail('');
    setSelectedRole('');
  };

  const handleGenerateInvite = () => {
    alert(`Invite link generated: example.com/invite/${groupId}`);
  };

  const handleLeaveGroup = () => {
    const updatedGroups = JSON.parse(localStorage.getItem('careGroups')).filter(g => g.id !== groupId);
    localStorage.setItem('careGroups', JSON.stringify(updatedGroups));
    navigate('/user-dashboard');
  };

  const handleChangeRole = (index, newRole) => {
    const updated = [...members];
    updated[index].role = newRole;
    setMembers(updated);
  };

  const handleTransferAdmin = (index) => {
    alert(`${members[index].email} is now the Admin`);
  };

  const handleBackToDashboard = () => {
    const confirmAction = window.confirm("Do you want to save changes before going back?");
    if (confirmAction) {
      // Save current members
      const updatedGroup = { ...group, members };
      updateGroupStorage(updatedGroup);
    } else {
      // Discard and reset to original
      const updatedGroup = { ...group, members: originalMembers };
      updateGroupStorage(updatedGroup);
    }
    navigate('/user-dashboard');
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <button
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: 'dodgerblue',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
        onClick={handleBackToDashboard}
      >
        ← Back to Dashboard
      </button>

      <h2>Care Group Dashboard (Admin)</h2>
      {group && (
        <div style={{ marginBottom: '1rem', backgroundColor: '#fff', borderRadius: '8px', padding: '1rem' }}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
      )}

      <input
        type="email"
        value={memberEmail}
        onChange={(e) => setMemberEmail(e.target.value)}
        placeholder="Member Email"
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      >
        <option value="">Select Role</option>
        <option value="Elderly">Elderly</option>
        <option value="Caregiver">Caregiver</option>
        <option value="Family">Family Member</option>
      </select>

      <button
        style={{ background: 'dodgerblue', color: 'white', padding: '0.7rem', width: '100%', marginBottom: '0.5rem' }}
        onClick={handleAddMember}
      >
        Add Member
      </button>
      <button
        style={{ background: '#5f676d', color: 'white', padding: '0.7rem', width: '100%', marginBottom: '0.5rem' }}
        onClick={handleGenerateInvite}
      >
        Generate Invite Link
      </button>
      <button
        style={{ background: 'crimson', color: 'white', padding: '0.7rem', width: '100%' }}
        onClick={handleLeaveGroup}
      >
        Leave Group
      </button>

      <h3 style={{ marginTop: '2rem' }}>Group Members</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {member.email} — 
            <select
              value={member.role}
              onChange={(e) => handleChangeRole(index, e.target.value)}
              style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
            >
              <option value="Elderly">Elderly</option>
              <option value="Caregiver">Caregiver</option>
              <option value="Family">Family Member</option>
            </select>
            <button
              onClick={() => handleTransferAdmin(index)}
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
            >
              Make Admin
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupDashboard;
