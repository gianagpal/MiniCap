// careGroup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CareGroup() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCreateGroup = (e) => {
    e.preventDefault();

    // Simulate group creation
    console.log('Care Group Created:', groupName, description);

    // Store admin role in localStorage
    localStorage.setItem('admin', 'true');
    localStorage.setItem('careGroupName', groupName);

    // Show confirmation modal
    setShowSuccess(true);
  };

  return (
    <div className="form-container">
      <h2>Create Care Group</h2>
      <form onSubmit={handleCreateGroup}>
        <input
          type="text"
          placeholder="Care Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Group</button>
      </form>

      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccess(false)}>&times;</span>
            <p>Care Group "{groupName}" created successfully!</p>
            <p>You are the Admin of this group.</p>
            <button onClick={() => navigate('/group-dashboard')}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareGroup;
