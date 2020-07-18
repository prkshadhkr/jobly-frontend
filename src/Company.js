import React, { useContext, useEffect, useState } from 'react';
import JoblyApi from './Api';
import { useParams } from 'react-router-dom';
import UserContext from './UserContext';
import CardList from './CardList';

const Company = () =>{
    const { handle } = useParams();
    const { user } = useContext(UserContext);
    const [company, setCompany] = useState(null);

    useEffect(() =>{
        const companyAndJobs = async () =>{
            const { jobs } = user;
            const resCompany = await JoblyApi.getCompany(handle);
            const jobAppliedId = new Set(jobs.map(j => j.id));

            resCompany.jobs = resCompany.jobs.map(j => ({
                ...j,
                state: jobAppliedId.has(j.id) ? "applied": null
            }));

            setCompany(resCompany);
        }

        companyAndJobs();
    }, [ handle, user])

    const applyJob = async (index) =>{
        if(company && Array.isArray(company.jobs) && index < company.jobs.length){
            let jId = company.jobs[index].id;
            let resMessage = await JoblyApi.applyToJob(jId);

            setCompany(d => {
                let newCompany = { ...d };
                newCompany.jobs = newCompany.jobs.map(j =>
                    j.id === jId ? { ...j, state: resMessage  } : j 
                );
                return newCompany;
            });
        }
        
    }

    if (!company){
        return <h1>Loading...</h1>
    }

    return(
        <div className="col-md-8 offset-md-2">
            <h5>
                {company.name}
            </h5>
            <p>{company.description}</p>
            <CardList cards={company.jobs} apply={applyJob}/>
        </div>
    )
}

export default Company;