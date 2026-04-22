import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <h1>TEAM 13</h1>
      <p>Welcome to the Student Team Members Management Dashboard</p>
      <div className="button-group">
        <Link to="/add-member" className="btn">Add Member</Link>
        <Link to="/view-members" className="btn btn-secondary">View Members</Link>
      </div>
    </div>
  );
}

export default HomePage;
