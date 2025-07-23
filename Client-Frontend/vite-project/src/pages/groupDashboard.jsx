import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function GroupDashboard() {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('admin') === 'true';

  const handleAddMember = (e) => {
    e.preventDefault();
    const newMember = { email, role };
    setMembers([...members, newMember]);
    setEmail('');
    setRole('');
  };

  const handleRemove = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const handleGenerateLink = () => {
    if (!role) return alert('Please select a role first.');
    const inviteLink = `http://localhost:5173/register?groupId=12345&role=${role}`;
    alert(`Invite link: ${inviteLink}`);
  };

  const handleEditRole = (index, newRole) => {
    const updated = [...members];
    updated[index].role = newRole;
    setMembers(updated);
  };

  const handleTransferAdmin = (index) => {
    const newAdmin = members[index];
    alert(`${newAdmin.email} is now the admin.`);
    localStorage.setItem('admin', 'false');
    setMembers(members.filter((_, i) => i !== index));
    navigate('/');
  };

  const handleLeaveGroup = () => {
    localStorage.removeItem('admin');
    alert('You have left the group.');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Care Group Dashboard ({isAdmin ? 'Admin' : 'Member'})</h2>

      {isAdmin && (
        <>
          <form onSubmit={handleAddMember}>
            <input
              type="email"
              placeholder="Member Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Elderly">Elderly</option>
              <option value="Family Member">Family Member</option>
              <option value="Caregiver">Caregiver</option>
            </select>
            <button type="submit">Add Member</button>
            <button type="button" onClick={handleGenerateLink}>Generate Invite Link</button>
          </form>

          <button onClick={handleLeaveGroup} style={{ marginTop: '10px', backgroundColor: 'red' }}>
            Leave Group
          </button>
        </>
      )}

      <div>
        <h3>Group Members</h3>
        <ul>
          {members.map((m, i) => (
            <li key={i}>
              {m.email} - {m.role}
              {isAdmin && (
                <>
                  <select
                    value={m.role}
                    onChange={(e) => handleEditRole(i, e.target.value)}
                  >
                    <option value="Elderly">Elderly</option>
                    <option value="Family Member">Family Member</option>
                    <option value="Caregiver">Caregiver</option>
                  </select>
                  <button onClick={() => handleRemove(i)}>Remove</button>
                  <button onClick={() => handleTransferAdmin(i)}>Make Admin</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GroupDashboard;
