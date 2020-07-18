import React from 'react';

const JobCard = ({item = {}, handleApply }) =>{
  const { title, salary, equity  } = item;

  return (
    <div className="Card card">
      <div className="card-body">

        <h5 className="card-title d-flex justify-content-between">
          <span>
              {title}
          </span>
        </h5>

        <div>
          Salary: {salary}
        </div>
        
        <div>
          Equity: {equity}
        </div>

        <button 
          className="btn btn-outline-danger float-right"
          onClick={handleApply}
          disabled={item.state}
        >
          {!item.state ? "Apply": "Applied"}
        </button>
      </div>
    </div>
  )
}

export default JobCard;