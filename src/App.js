import { useState } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [cv, setCv] = useState(null);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCvChange = (event) => {
    setCv(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('description', description);
    if (cv) {
      formData.append('cv', cv);
    }
    fetch('http://localhost:3000/candidate', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
      window.location.reload();
  };

  return (
    <div class="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={handleFirstNameChange} placeholder="First Name" />
          </label>
        </div>
        <div>
          <label>
            <input type="text" value={lastName} onChange={handleLastNameChange}  placeholder="Last Name"/>
          </label>
        </div>
        <div>
          <label>
            <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
          </label>
        </div>
        <div>
          <label>
            <textarea value={description} onChange={handleDescriptionChange} placeholder="About you" />
          </label>
        </div>
        <div>
          <label>
            <input type="file" accept=".pdf,.docx" onChange={handleCvChange} />
          </label>
        </div >
        <button  type="submit">S U B M I T</button>
      </form>
    </div>
  );
}
export default App;
