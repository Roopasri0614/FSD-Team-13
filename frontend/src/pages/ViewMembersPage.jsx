import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <div className="loading">Loading members...</div>;

  return (
    <div>
      <div className="top-bar">
        <h2>Team Members</h2>
        <div className="nav-links">
          <Link to="/" className="btn btn-secondary">Home</Link>
          <Link to="/add-member" className="btn">Add New Member</Link>
        </div>
      </div>

      {error && <div className="error-message" style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      
      {members.length === 0 && !error ? (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#666' }}>No members found in the team.</p>
          <Link to="/add-member" className="btn">Be the first to add one!</Link>
        </div>
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <div key={member._id} className="member-card">
              <div className="member-image-container">
                <img 
                  src={`http://localhost:5000/uploads/${member.image}`} 
                  alt={member.name} 
                  className="member-image"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/250?text=No+Image' }}
                />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>Roll No: {member.roll}</p>
                <Link to={`/member/${member._id}`} className="btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembersPage;
