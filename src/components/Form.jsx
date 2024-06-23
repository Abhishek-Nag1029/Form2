import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    Position: "",
    experience: "",
    portfolio: "",
    management: "",
    skills: {
      javascript: false,
      CSS: false,
      python: false,
      React: false,
      C: false,
    },
    interviewTime: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  const handlePositionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      Position: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: checked
      }
    }));
  };

  const hasSelectedSkills = () => {
    return Object.values(formData.skills).some(skill => skill);
  };

  const getSelectedSkills = () => {
    return Object.entries(formData.skills)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(', ');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center text-gray-500 text-sm">
      {!submittedData ? (
        <div>
          <form className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg" onSubmit={handleSubmit}>
            <div className='form-container'>
              <h1>Job Application Form</h1>
              <div className="formwrap">
                <label className="mb-5">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  name='fullname'
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div className="formwrap">
                <label className="mb-5">Email</label>
                <input
                  type="email"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  name='email'
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="formwrap">
                <label className="mb-5">Phone Number</label>
                <input
                  type="tel"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  name='phoneNumber'
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  minLength="10"
                />
              </div>
              <div className="formwrap">
                <label className="mb-5">Applying for Position</label>
                <select
                  name="position Applying For"
                  value={formData.Position}
                  onChange={handlePositionChange}
                  required
                >
                  <option value="">Select a Position</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              {(formData.Position === 'Developer' || formData.Position === 'Designer') &&
                <div className="formwrap">
                  <label className="mb-5">Relevant Experience (in years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    required={formData.Position === 'Developer' || formData.Position === 'Designer'}
                    min="1"
                  />
                </div>
              }
              {formData.Position === "Designer" &&
                <div className="formwrap">
                  <label className="mb-5">Portfolio URL</label>
                  <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                    required={formData.Position === 'Designer'}
                  />
                </div>
              }
              {formData.Position === "Manager" &&
                <div className="formwrap">
                  <label className="mb-5">Management Experience</label>
                  <input
                    type="text"
                    name="management"
                    value={formData.management}
                    onChange={(e) => setFormData(prev => ({ ...prev, management: e.target.value }))}
                    required={formData.Position === 'Manager'}
                  />
                </div>
              }
              <div className="formwrap">
                <label className="mb-5">Additional Skills</label>
                <div>
                  <input
                    type="checkbox"
                    id="javascript"
                    name="javascript"
                    checked={formData.skills.javascript}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="javascript">Javascript</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="python"
                    name="python"
                    checked={formData.skills.python}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="python">Python</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="css"
                    name="CSS"
                    checked={formData.skills.CSS}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="css">CSS</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c"
                    name="C"
                    checked={formData.skills.C}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="c">C</label>
                </div>
              </div>
              <div className="formwrap">
                <label className="mb-5">Preferred Interview Time</label>
                <input
                  type="datetime-local"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  name="interviewTime"
                  value={formData.interviewTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, interviewTime: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="mt-5 bg-blue-500 py-3 rounded-md text-white">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <div className='Summary'>
          <h3>Form Summary</h3>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Phone Number: {submittedData.phone}</p>
          <p>Applying for Position: {submittedData.Position}</p>
          {submittedData.Position === 'Developer' || submittedData.Position === 'Designer' ?
            <p>Relevant Experience: {submittedData.experience}</p> :
            null
          }
          {submittedData.Position === 'Designer' ?
            <p>Portfolio URL: {submittedData.portfolio}</p> :
            null
          }
          {submittedData.Position === 'Manager' ?
            <p>Management Experience: {submittedData.management}</p> :
            null
          }
          {hasSelectedSkills() && (
            <p>Additional Skills: {getSelectedSkills()}</p>
          )}
          <p>Preferred Interview Time: {submittedData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
