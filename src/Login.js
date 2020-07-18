import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import JoblyApi from './Api';
import './Login.css';


const Login = ({ setToken }) =>{
  const history = useHistory();
  const initialValue = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    errors: []
  }
  const [viewInfo, setViewInfo] = useState("login");
  const [loginInfo, setLoginInfo] = useState(initialValue);

  const displayLogin = () =>{
        setViewInfo("login");
	}

  const displaySignup = () =>{
        setViewInfo("signup");
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
		let data;
		let endpoint;
		
    if(viewInfo === "signup"){
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
        first_name: loginInfo.first_name || undefined,
        last_name: loginInfo.last_name || undefined,
        email: loginInfo.email || undefined,
      	};
		endpoint = "register";
    } else {
			data = {
				username: loginInfo.username,
        password: loginInfo.password,
			}
			endpoint = "login";
		}

		let token;
		try {
			token = await JoblyApi[endpoint](data);
		} catch (errors) {   //Note: "errors" as we initited array as errors: []
			return setLoginInfo(res =>({ ...res, errors}))
		}
		setToken(token);
		history.push("/jobs");
	}

	const handleChange = (e) =>{
		const { name, value } = e.target;
		setLoginInfo(d => ({ 
			...d,
			[name]: value
		}));
	}

	let isLoggedIn = viewInfo === "login";

	const signupElements = (
		<div>
			<div className="form-group row">
				<label htmlFor="for-firstname" className="col-sm-4">First name</label>
				<div className="col-sm-8">
					<input 
						id="for-firstname"
						name="first_name"
						value={loginInfo.first_name}
						className="form-control"
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="form-group row">
				<label htmlFor="for-lastname" className="col-sm-4">Last name</label>
				<div className="col-sm-8">
					<input 
						id="for-lastname"
						name="last_name"
						value={loginInfo.last_name}
						className="form-control"
						onChange={handleChange}
					/>
				</div>
	
			</div>
			<div className="form-group row">
				<label htmlFor="for-email" className="col-sm-4">Email</label>
				<div className="col-sm-8">
					<input 
						id="for-email"
						name="email"
						value={loginInfo.email}
						className="form-control"
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>)

    return(
			<div>
        <div className="col-md-6 col-lg-4 offset-md-3 offset-md-4">
					<div className="btn-group">
							<button 
								className={`btn btn-outline-info ${isLoggedIn ? "active": ""} `}
								onClick={displayLogin}>
								Login
							</button>

						<button 
							className={`btn btn-outline-info ${isLoggedIn ? "": "active"} `}
							onClick={displaySignup}>
							Signup
						</button>
					</div>
				</div>

				<div className="col-md-6 col-lg-4 offset-md-3 offset-md-4">
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>

							<div className="form-group row">
								<label htmlFor="for-username" className="col-sm-4">Username</label>
								<div className="col-sm-8">
									<input 
										id="for-username"
										name="username"
										value={loginInfo.username}
										onChange={handleChange}
										className="form-control"/>
								</div>
							</div>
							
							<div className="form-group row">
								<label htmlFor="for-password" className="col-sm-4">Password</label>
								<div className="col-sm-8">
									<input 
										id="for-password"
										name="password"
										type="password"
										value={loginInfo.password}
										onChange={handleChange}
										className="form-control"/>
								</div>
							</div>

							{isLoggedIn ? "" : signupElements}

							{loginInfo.errors.length ? (
								<Alert type="danger" msgs={loginInfo.errors} />
							): null }
							<button 
								type="submit"
								className="btn btn-outline-primary float-right"
								onSubmit={handleSubmit}>
								Submit
							</button>
							
						</form>
					</div>
				</div>
				</div>
			</div>
    )
}

export default Login;