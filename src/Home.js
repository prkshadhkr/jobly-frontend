import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

const Home =() =>{
	const { user } = useContext( UserContext );
	return (
		<div className="Home d-flex justify-content-center">
			<div >
				<h1 className="d-flex justify-content-center">Jobly</h1>
				<p className="d-flex justify-content-center font-weight-light">All jobs in one place</p>
				{!user ?(
					<div className="Login d-flex justify-content-center">
						<Link 
						  className="btn btn-outline-primary"
						  to="/login" >
						    Login
					  </Link>
					</div>):(
				<h5 className="d-flex justify-content-center">
					Welcome back {user.first_name}!
				</h5>
				)
			}
			</div>
		</div>
	)
}

export default Home;