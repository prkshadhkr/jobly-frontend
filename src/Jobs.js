import React, { useState, useEffect } from 'react';
import JoblyApi from './Api';
import Search from './Search';
import CardList from './CardList';


const Jobs = () =>{
	const [jobs, setJobs ] = useState([]);

	const search = async (q) =>{
		let resJobs = await JoblyApi.getJobs(q);
		setJobs(resJobs);
	}

	useEffect(() => {
		search();
	}, []);

	const apply = async (index) => {
		let jobById = jobs[index].id;
		let resMessage = await JoblyApi.applyToJob(jobById);

		setJobs(d => d.map(j => 
			j.id === jobById ? { ...j, state: resMessage } : j ))
	}

	return(
		<div className="col-md-8 offset-md-2">
			<Search endpoint="jobs" search={search} />
			<CardList cards={jobs} apply={apply} />
		</div>
	)
}

export default Jobs;