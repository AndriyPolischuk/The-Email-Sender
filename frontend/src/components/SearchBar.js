import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchBarValue, handleValues }) => {
  return (
    <div className='form-group'>
      <div className='inputContainer'>
        <div style={{ margin: 'auto' }}>
          <label
            className='text-muted'
            htmlFor='searchBarValue'
            style={{ fontSize: '16px' }}>
            Search for a lead
          </label>
          <input
            placeholder='Search by email or company name'
            id='searchBarValue'
            name='searchBarValue'
            value={searchBarValue}
            onChange={handleValues}
            className='form-control'
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
