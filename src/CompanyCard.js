import React from 'react';
import { Link } from 'react-router-dom';
import DEFAULT_LOGO from './Logo.jpg'

const CompanyCard = ({item = {} }) =>{
	const { name, description, logo_url, handle } = item;

	return (
    <Link 
      className="Card card"
      to={`/companies/${handle}`}
    >
			<div className="card-body">
				<h5 className="card-title d-flex justify-content-between">
					<span>
						{name}
					</span>
				  <img src={logo_url || DEFAULT_LOGO} alt={`${name} logo`} />
				</h5>
				<p>{ description }</p>
			</div>
		</Link>
	)
}

export default CompanyCard;