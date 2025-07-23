import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert('Group name is required');
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: groupName,
      description: description
    };

    const storedGroups = JSON.parse(localStorage.getItem('careGroups')) || [];
    storedGroups.push(newGroup);
    localStorage.setItem('careGroups', JSON.stringify(storedGroups));

    navigate('/user-dashboard');
  };

  return (
    <div className="page-container">
      <h2>Create Care Group</h2>
      <input
        type="text"
        placeholder="Care Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleCreateGroup}>
        Create Group
      </button>
    </div>
  );
};

export default CareGroup;
