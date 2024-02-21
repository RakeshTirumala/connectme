import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import NavbarComponent from "../components/navbarComponent";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    interests: [''],
    skills: [''],
    education: [{ institution: '', degree: '', major: '', graduationYear: '' }],
    workExperience: [{ jobTitle: '', company: '', description: '', duration: '' }],
    location: '',
    profilePicture: null,
    linkedIn: '',
    github: '',
    mentorshipAvailability: false,
    certifications: [''],
  });

  const handleChange = (e, index, field, subfield) => {
    const { name, value } = e.target;
    const newData = [...profileData[field]];
    if (subfield) {
      newData[index] = { ...newData[index], [subfield]: value };
    } else {
      newData[index] = value;
    }
    setProfileData({ ...profileData, [field]: newData });
  };

  const handleAddItem = (field) => {
    setProfileData({ ...profileData, [field]: [...profileData[field], ''] });
  };

  const handleRemoveItem = (index, field) => {
    const newData = [...profileData[field]];
    newData.splice(index, 1);
    setProfileData({ ...profileData, [field]: newData });
  };
  const handlePictureChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(profileData);
  };
 
  return (
 
    <>    <NavbarComponent />   <Container>
    <h1>Create Your Profile</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
        />
      </Form.Group>
  
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
        />
      </Form.Group>
  
      
  
      <Form.Group controlId="interests">
        <Form.Label>Interests</Form.Label>
        {profileData.interests.map((interest, index) => (
          <div key={index}>
            <Form.Control
              type="text"
              value={interest}
              onChange={(e) => handleChange(e, index, 'interests')}
            />
            <Button variant="danger" onClick={() => handleRemoveItem(index, 'interests')}>
              -
            </Button>
          </div>
        ))}
        <Button variant="success" onClick={() => handleAddItem('interests')}>
          +
        </Button>
      </Form.Group>
  
      <Form.Group controlId="skills">
        <Form.Label>Skills</Form.Label>
        {profileData.skills.map((objective, index) => (
          <div key={index}>
            <Form.Control
              type="text"
              value={objective}
              onChange={(e) => handleChange(e, index, 'skills')}
            />
            <Button variant="danger" onClick={() => handleRemoveItem(index, 'skills')}>
              -
            </Button>
          </div>
        ))}
        <Button variant="success" onClick={() => handleAddItem('skills')}>
          +
        </Button>
      </Form.Group>
  
      <Form.Group controlId="education">
        <Form.Label>Education</Form.Label>
        {profileData.education.map((edu, index) => (
          <div key={index}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(e, index, 'education', 'institution')}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(e, index, 'education', 'degree')}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Major"
                  value={edu.major}
                  onChange={(e) => handleChange(e, index, 'education', 'major')}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(e) => handleChange(e, index, 'education', 'graduationYear')}
                />
              </Col>
            </Row>
            <Button variant="danger" onClick={() => handleRemoveItem(index, 'education')}>
              -
            </Button>
          </div>
        ))}
        <Button variant="success" onClick={() => handleAddItem('education')}>
          +
        </Button>
      </Form.Group>
  
      <Form.Group controlId="workExperience">
        <Form.Label>Work Experience</Form.Label>
        {profileData.workExperience.map((exp, index) => (
          <div key={index}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => handleChange(e, index, 'workExperience', 'jobTitle')}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, index, 'workExperience', 'company')}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleChange(e, index, 'workExperience', 'description')}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleChange(e, index, 'workExperience', 'duration')}
                />
              </Col>
            </Row>
            <Button variant="danger" onClick={() => handleRemoveItem(index, 'workExperience')}>
              -
            </Button>
          </div>
        ))}
        <Button variant="success" onClick={() => handleAddItem('workExperience')}>
          +
        </Button>
      </Form.Group>
  
      <Form.Group controlId="profilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" onChange={handlePictureChange} />
        </Form.Group>

        <Form.Group controlId="linkedIn">
          <Form.Label>LinkedIn Profile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your LinkedIn profile URL"
            value={profileData.linkedIn}
            onChange={(e) => setProfileData({ ...profileData, linkedIn: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="github">
          <Form.Label>GitHub Profile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your GitHub profile URL"
            value={profileData.github}
            onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="certifications">
          <Form.Label>Certifications/Achievements</Form.Label>
          {profileData.certifications.map((certification, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Enter your certification or achievement"
                value={certification}
                onChange={(e) => handleChange(e, index, 'certifications')}
              />
              <Button variant="danger" onClick={() => handleRemoveItem(index, 'certifications')}>
                -
              </Button>
            </div>
          ))}
          <Button variant="success" onClick={() => handleAddItem('certifications')}>
            +
          </Button>
        </Form.Group>


      {/* Other fields */}
      
      <Button variant="primary" type="submit">
        Save Profile
      </Button>
    </Form>
  </Container> </>
  );
};

export default ProfilePage;
