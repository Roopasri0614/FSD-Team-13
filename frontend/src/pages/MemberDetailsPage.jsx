import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MemberDetailsPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/members/${id}`);
        navigate('/view-members');
      } catch (err) {
        console.error(err);
        alert('Failed to delete member.');
      }
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch member details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="error-message" style={{ textAlign: 'center' }}>{error}</div>;
  if (!member) return <div style={{ textAlign: 'center' }}>Member not found.</div>;

  return (
    <div>
      <div className="top-bar">
        <h2>Member Profile</h2>
        <div className="nav-links">
          <button onClick={handleDelete} className="btn" style={{ background: '#DC2626', color: 'white', boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)' }}>Delete</button>
          <Link to="/view-members" className="btn btn-secondary">Back</Link>
        </div>
      </div>

      <div className="details-container">
        <div className="details-header">
          <img 
            src={`http://localhost:5000/uploads/${member.image}`} 
            alt={member.name} 
            className="details-image"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image' }}
          />
          <div className="details-title">
            <h2>{member.name}</h2>
            <p>Roll No: {member.roll}</p>
            <p>{member.email} | {member.phone}</p>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <strong>Year</strong>
            {member.year}
          </div>
          <div className="detail-item">
            <strong>Degree</strong>
            {member.degree}
          </div>
          <div className="detail-item">
            <strong>Project</strong>
            {member.project}
          </div>
          <div className="detail-item">
            <strong>Hobbies</strong>
            {member.hobbies}
          </div>
          <div className="detail-item">
            <strong>Certificate</strong>
            {member.certificate}
          </div>
          <div className="detail-item">
            <strong>Internship</strong>
            {member.internship}
          </div>
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>About Your Aim</strong>
            {member.aboutYourAim}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsPage;
