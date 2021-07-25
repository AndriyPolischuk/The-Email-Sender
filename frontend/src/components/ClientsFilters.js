import React, { useState, useEffect } from 'react';

const ClientsFilters = ({ country, state, city, from, till, handleValues }) => {
  return (
    <div className='row' style={{ marginTop: '70px' }}>
      <div
        className='col-12 col-sm-12 col-md-4 col-lg-4'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='country'>
            Country
          </label>
          <input
            name='country'
            id='country'
            className='form-control'
            placeholder='country'
            value={country}
            onChange={handleValues}
          />
        </div>
      </div>

      <div
        className='col-12 col-sm-12 col-md-4 col-lg-4'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='state'>
            State
          </label>
          <input
            name='state'
            id='state'
            className='form-control'
            placeholder='state'
            value={state}
            onChange={handleValues}
          />
        </div>
      </div>

      <div
        className='col-12 col-sm-12 col-md-4 col-lg-4'
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
          <label className='text-muted' htmlFor='from'>
            From
          </label>
          <input
            name='from'
            id='from'
            type='date'
            className='form-control'
            value={from}
            onChange={handleValues}
          />
        </div>
      </div>
      <div
        className='col-12 col-sm-12 col-md-6 col-lg-6'
        style={{ margin: 'auto' }}>
        <div className='form-group '>
          <label className='text-muted' htmlFor='till'>
            Till
          </label>
          <input
            name='till'
            id='till'
            type='date'
            className='form-control'
            value={till}
            onChange={handleValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientsFilters;
