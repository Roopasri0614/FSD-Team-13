import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddMemberPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roll: '',
    year: '',
    degree: '',
    project: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic Validation
    for (const key in formData) {
      if (!formData[key]) {
        setError(`Please fill in all fields. Missing: ${key}`);
        return;
      }
    }
    
    if (!image) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/members', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/view-members');
    } catch (err) {
      console.error(err);
      setError('Error saving member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="top-bar">
        <h2>Add New Member</h2>
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
      
      <div className="form-container">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" />
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
          </div>
          
          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" name="roll" value={formData.roll} onChange={handleChange} placeholder="e.g. 101" />
          </div>
          
          <div className="form-group">
            <label>Year</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Degree</label>
            <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. B.Tech Computer Science" />
          </div>
          
          <div className="form-group">
            <label>Project</label>
            <input type="text" name="project" value={formData.project} onChange={handleChange} placeholder="Current Project Name" />
          </div>
          
          <div className="form-group">
            <label>Hobbies</label>
            <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="e.g. Reading, Coding, Sports" />
          </div>
          
          <div className="form-group">
            <label>Certificate</label>
            <input type="text" name="certificate" value={formData.certificate} onChange={handleChange} placeholder="Any relevant certification" />
          </div>
          
          <div className="form-group">
            <label>Internship</label>
            <input type="text" name="internship" value={formData.internship} onChange={handleChange} placeholder="Past internship experience" />
          </div>
          
          <div className="form-group">
            <label>About Your Aim</label>
            <textarea name="aboutYourAim" value={formData.aboutYourAim} onChange={handleChange} rows="4" placeholder="Describe your future goals"></textarea>
          </div>
          
          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMemberPage;
