import React, { useState } from 'react';

const Search = ({search}) =>{
    const [ searchItem, setSearchItem ] = useState("")
    const handleSubmit = e =>{
      e.preventDefault();
      search(searchItem);
    }

    const handleChange = e =>{
      const { value } = e.target;
      setSearchItem(value);
    }

    return (
      <div className="Search mb-4" >
        <form className="form-inline" onSubmit={handleSubmit}>
          <input 
            className="form-control flex-grow-1"
            type="search"
            name="search"
            placeholder="Search..."
            value={searchItem}
            onChange={handleChange}
          />
          <button 
            className="btn btn-outline-success" 
            type="submit">
            Submit
          </button>
        </form>
      </div>
    )
}

export default Search;