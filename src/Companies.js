import React, { useState, useEffect } from 'react';
import JoblyApi from './Api';
import Search from './Search';
import CardList from './CardList';


const Companies = () =>{
    const [companies, setCompanies ] = useState([]);

    const search = async (q) =>{
        let resCompanies = await JoblyApi.getCompanies(q);
        setCompanies(resCompanies);
    }

    useEffect(() => {
        search();
    }, []);


    return(
        <div className="Companies col-md-8 offset-md-2">
            <Search endpoint="jobs" search={search} />
            <CardList cards={companies} />
        </div>
    )
}

export default Companies;