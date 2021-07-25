import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ClientsCard = ({ client }) => {
  const { _id, businessName, createdAt, country } = client;

  return (
    <div className='card '>
      <div className='card-body'>
        <div className='row'>
          <div className='col-6 col-sm-4 col-md-6 col-lg-6'>
            <Link to={{ pathname: `/client/${_id}` }}>{businessName}</Link>
          </div>
          <div className='col-6 col-sm-4 col-md-3 col-lg-3'>{country}</div>
          <div className='col-6 col-sm-4 col-md-3 col-lg-3'>
            {moment(createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsCard;
