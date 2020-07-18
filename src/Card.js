import React from 'react';
import JobCard from './JobCard';
import CompanyCard from './CompanyCard'
import './Card.css';


const Card = ({ item = {}, apply = () => null, index }) =>{
  if(item.handle){
  return(
      <CompanyCard item={item} />
    )
  } else {
    return (
      <JobCard item={item} handleApply={()=>apply(index)} />
    )
  }
}

export default Card;