import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [careGroups, setCareGroups] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('careGroups')) || [];
    setCareGroups(storedGroups);
  }, []);

  const handleAddGroup = () => {
    navigate('/caregroup');
  };

  const handleEditGroup = (groupId) => {
    const group = careGroups.find((g) => g.id === groupId);

    // Show warning only if current user transferred admin rights
    if (
      group &&
      group.originalAdminId && // this is only set if admin transfer happened
      group.originalAdminId !== localStorage.getItem('userId')
    ) {
      alert('Sorry, you are no longer the admin of this group and cannot edit it.');
      return;
    }

    navigate('/group-dashboard', { state: { groupId } });
  };

  const handleLeaveGroup = (groupId) => {
    const confirmLeave = confirm('Are you sure you want to leave this group?');
    if (!confirmLeave) return;

    const updatedGroups = careGroups.filter(group => group.id !== groupId);
    setCareGroups(updatedGroups);
    localStorage.setItem('careGroups', JSON.stringify(updatedGroups));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      {/* Top-right Logout */}
      <div style={{ position: 'absolute', top: 20, right: 30 }}>
        <a
          href="#"
          onClick={handleLogout}
          style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          Logout
        </a>
      </div>

      <h2>User Dashboard</h2>

      {careGroups.length === 0 && <p>No care groups joined yet.</p>}

      <div className="caregroup-list">
        {careGroups.map((group) => (
          <div key={group.id} className="caregroup-card">
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <div className="button-row">
              <button className="btn btn-primary" onClick={() => handleEditGroup(group.id)}>
                ✏️ Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleLeaveGroup(group.id)}>
                🚪 Leave
              </button>
            </div>
          </div>
        ))}

        <button className="btn btn-primary" onClick={handleAddGroup}>
          ➕ Add Care Group
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
