import React, { useState, useEffect } from 'react';

const LeadsFilters = ({
  leadStatus,
  city,
  uploadedFrom,
  uploadedTill,
  handleValues,
}) => {
  return (
    <div className='row' style={{ marginTop: '70px' }}>
      <div
        className='col-12 col-sm-12 col-md-6 col-lg-6'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='leadStatus'>
            Lead Status
          </label>
          <select
            name='leadStatus'
            id='leadStatus'
            className='form-control'
            value={leadStatus}
            onChange={handleValues}>
            <option value=''>Please select email status</option>
            <option value='sent'>sent</option>
            <option value='pending'>pending</option>
            <option value='cancelled'>cancelled</option>
          </select>
        </div>
      </div>
      <div
        className='col-12 col-sm-12 col-md-6 col-lg-6'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='city'>
            City
          </label>
          <input
            name='city'
            id='city'
            className='form-control'
            placeholder='city'
            value={city}
            onChange={handleValues}
          />
        </div>
      </div>
      <div
        className='col-12 col-sm-12 col-md-6 col-lg-6'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='uploadedFrom'>
            Uploaded from
          </label>
          <input
            name='uploadedFrom'
            id='uploadedFrom'
            type='date'
            className='form-control'
            value={uploadedFrom}
            onChange={handleValues}
          />
        </div>
      </div>
      <div
        className='col-12 col-sm-12 col-md-6 col-lg-6'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='uploadedTill'>
            Uploaded till
          </label>
          <input
            name='uploadedTill'
            id='uploadedTill'
            type='date'
            className='form-control'
            value={uploadedTill}
            onChange={handleValues}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsFilters;
