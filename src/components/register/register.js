import { useState } from 'react';
import registerUser from '../../utils/register';
import "./register.css";

const ImageThumb = ({ image }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img style={{ marginTop: "10px", objectFit: "contain", width: "60%" }} src={URL.createObjectURL(image)} alt={image.name} />;
    </div>
  );
};

const Register = () => {

  const [user, setUser] = useState({
    name: "",
    joiningYear: "",
    section: "",
    rollNumber: "",
    image: "",
  });

  const { name, joiningYear, section, rollNumber, image } = user;

  const onChange = (e) =>  setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    registerUser(user);
    setUser({
      name: "",
      joiningYear: "",
      section: "",
      rollNumber: "",
      image: "",
    });
  };

  const handleUpload = (e) => setUser({ ...user, image: e.target.files[0] })
  
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div className="heading">Register</div><br />
      <div className="auth-form">
        <form onSubmit={onSubmit}>
          <div className="register-label"><i className="fas fa-user"></i> Name</div>
          <input className="form-input" type="text" name="name" value={name} onChange={onChange} required />
          <div className="register-label"><i className="fas fa-calendar"></i> Joining Year</div>
          <input className="form-input" type="number" name="joiningYear" value={joiningYear} onChange={onChange} required />
          <div className="register-label"><i className="fas fa-envelope"></i> Section</div>
          <input className="form-input" type="text" name="section" value={section} onChange={onChange} required placeholder='CSE-A' />
          <div className="register-label"><i className="fas fa-id-badge"></i> Roll Number</div>
          <input className="form-input" type="text" name="rollNumber" value={rollNumber} onChange={onChange} required placeholder='18B81A0556' />
          <div className="register-label"><i className="fas fa-id-badge"></i> Image</div>
          <label className='file-upload'>
            {image ? `${image.name}` : "Choose image to upload"}
            <input type="file" onChange={handleUpload}/>
          </label>
          {image && <ImageThumb image={image} />}
          <br />
          <button className="submit-button"><i className="fas fa-user-plus"></i> register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;