import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';

const LeadsCard = ({
  leads,
  cancelSendingOneEmail,
  resendOneLead,
  showMakeClientModal,
}) => {
  const btnCancelSending = id => (
    <span
      className='badge badge-pill btn-sm'
      style={{
        padding: '8px',
        cursor: 'pointer',
        backgroundColor: 'red',
        border: 'none',
        outline: 'none',
        color: 'white',
      }}
      onClick={() => cancelSendingOneEmail(id)}>
      Cancel sending
    </span>
  );

  const btnMakeClient = id => {
    return (
      <span
        className='badge badge-pill btn-sm'
        style={{
          padding: '8px',
          cursor: 'pointer',
          backgroundColor: 'green',
          border: 'none',
          outline: 'none',
          color: 'black',
        }}
        onClick={() => showMakeClientModal(id)}>
        Make our client
      </span>
    );
  };

  const resendEmailBtn = id => {
    return (
      <span
        className='badge badge-pill btn-sm'
        style={{
          padding: '8px',
          cursor: 'pointer',
          backgroundColor: 'yellow',
          border: 'none',
          outline: 'none',
          color: 'black',
        }}
        onClick={() => resendOneLead(id)}>
        Resend email
      </span>
    );
  };

  return (
    <div style={{ fontSize: '10px', marginTop: '10px', marginBottom: '30px' }}>
      <Table striped bordered hover responsive size='sm'>
        <thead>
          <tr className='text-center'>
            <th
              style={{
                position: 'sticky',
                left: '0',
                zIndex: '2',
                color: 'white',
                backgroundColor: `rgb(${'96, 104, 117'})`,
              }}>
              Business Name
            </th>
            <th>Sending status</th>
            <th>Website </th>
            <th>Phone</th>
            <th>Location</th>
            <th>Email</th>
            <th>Industry</th>
            <th>Email uploaded</th>
            <th>Email sent</th>
            <th>Cancel sending</th>
            <th>Make a client</th>
            <th>Resend email</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => {
            return (
              <tr key={lead._id}>
                <td
                  style={{
                    position: 'sticky',
                    left: '0',
                    zIndex: '2',
                    color: 'white',
                    backgroundColor: `rgb(${'96, 104, 117'})`,
                  }}>
                  {lead.businessName}
                </td>
                <td>{lead.status}</td>
                <td>{lead.website}</td>
                <td>{lead.telephone}</td>
                <td>{lead.location}</td>
                <td>{lead.email}</td>
                <td>{lead.industry}</td>
                <td>{moment(lead.createdAt).fromNow()}</td>
                <td>
                  {moment(lead.sentAt).fromNow() === 'Invalid date'
                    ? ''
                    : moment(lead.sentAt).fromNow()}
                </td>
                <td>
                  {lead.status === 'pending' && btnCancelSending(lead._id)}
                </td>
                <td>{lead.status === 'sent' && btnMakeClient(lead._id)}</td>
                <td>
                  {lead.status === 'cancelled' && resendEmailBtn(lead._id)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LeadsCard;
