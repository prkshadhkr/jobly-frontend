import React, {useContext, useEffect, useRef, useState} from 'react';
import JoblyApi from './Api';
import Alert from './Alert';
import UserContext from './UserContext';

const DISPLAY_IN_msc = 4000;

const Profile = () =>{
  const { user, setUser } = useContext(UserContext);
  const initialState = {
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    photo_url: user.photo_url || "",
    username: user.username,
    password:"",
    errors: [],
    confirmSave: false
  };
  const[formData, setFormData] = useState(initialState);
	const messageRef = useRef(false);
	
  useEffect(()=>{
    if(formData.confirmSave && !messageRef.current){
			messageRef.current = true;
			
      setTimeout(() =>{
      	setFormData(data =>({ ...data, confirmSave: false}));
        messageRef.current = false;
      }, DISPLAY_IN_msc);
    };
  }, [formData]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let username = formData.username;
      let updatedData = {
        first_name: formData.first_name || undefined,
        last_name: formData.last_name || undefined,
        email: formData.email || undefined,
        photo_url: formData.photo_url || undefined,
        password: formData.password
      };
      let updatedUser = await JoblyApi.updateUser(username, updatedData);
      console.log("UPDATED SUCCESSFULLY", updatedUser);
				
			//// did not update submitted data immediatedly 
      // setFormData(initialState); 
      setFormData(d => ({
        ...d,
        errors: [],
        confirmSave: true,
        password: ""
      }));

      setUser(updatedUser);
    } catch (errors) {     
      setFormData(d =>({ ...d, errors}));
    }
  }

  const handleChange = e =>{
    const { name, value } = e.target;
    setFormData(data =>({
      ...data,
      [name]: value,
      errors: []
    }))
  }

  return(
    <div className="col-md-6 col-lg-4 offset-md-3 offset-md-4">
      <h4>Profile</h4>
        <div className="card">
          <div className="card-body">
						<form onSubmit={handleSubmit}>

							<div className="form-group row">
								<label htmlFor="for-username" className="col-sm-4">Username</label>
								<div className="col-sm-8">
								 	<p> <b>{ formData.username}</b></p>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="for-firstname" className="col-sm-4">First name</label>
								<div className="col-sm-8">
									<input 
										id="for-firstname"
										className="form-control"
										name="first_name"
										value={formData.first_name}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="for-lastname" className="col-sm-4">Last name</label>
								<div className="col-sm-8">
									<input 
										id="for-lastname"
										className="form-control"
										name="last_name"
										value={formData.last_name}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="for-email" className="col-sm-4">Email</label>
								<div className="col-sm-8">
									<input 
										id="for-email"
										className="form-control"
										name="email"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="for-photourl" className="col-sm-4">Photo URL</label>
								<div className="col-sm-8">
									<input 
								  	id="for-photourl"
										className="form-control"
										name="photo_url"
										value={formData.photo_url}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="form-group row">
								<label htmlFor="for-password" className="col-sm-4">Password</label>
								<div className="col-sm-8">
									<input 
								  	id="for-password"
										className="form-control"
										name="password"
										type="password"
										value={formData.password}
										onChange={handleChange}
									/>
								</div>
							</div>

							{formData.errors.length ?(
								<Alert type="danger" msgs={formData.errors} />
							): null }

							{formData.confirmSave ?(
								<Alert type="success" msgs={["Successfully updated!"]} />
							): null }

							<button onSubmit={handleSubmit} className="btn btn-outline-primary float-right mt-4">
								Update
							</button>

						</form>
          </div>
        </div>
    </div>
  );
}

export default Profile;