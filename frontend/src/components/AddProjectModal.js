import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const AddProjectModal = ({
  shouldShowAddProjectModal,
  handleCloseAddProjectModal,
  projectName,
  industry,
  status,
  appType,
  handleValues,
  handleSubmitProject,
  add,
  edit,
}) => {
  return (
    <Modal
      show={shouldShowAddProjectModal}
      size='lg'
      onHide={handleCloseAddProjectModal}
      backdrop='static'
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {add ? (
            <h5 style={{ color: 'red' }}>Add project</h5>
          ) : (
            <h5 style={{ color: 'red' }}>Edit project</h5>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitProject}>
          <div className='form-group'>
            <label className='text-muted' htmlFor='projectName'>
              Project Name
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <input
              id='projectName'
              name='projectName'
              className='form-control'
              type='text'
              placeholder='Project name'
              value={projectName}
              onChange={handleValues}
              required
            />
          </div>
          <div className='form-group'>
            <label className='text-muted' htmlFor='industry'>
              Industry
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <select
              name='industry'
              className='form-control'
              id='industry'
              value={industry}
              onChange={handleValues}
              required>
              <option value=''>Please select industry</option>
              <option value='Construction'>Construction</option>
              <option value='Healthcare'>Healthcare</option>
              <option value='Home Services'>Home Services</option>
              <option value='Financial Services'>Financial Services</option>
              <option value='Legal Services'>Legal Services</option>
              <option value='Property'>Property</option>
              <option value='Security'>Security</option>
              <option value='Software Development'>Software Development</option>
              <option value='Trucking Services'>Trucking Services</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='text-muted' htmlFor='status'>
              Project status
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <select
              id='status'
              name='status'
              type='text'
              className='form-control'
              placeholder='Enter project status'
              value={status}
              onChange={handleValues}
              required>
              <option value=''>Please select status</option>
              <option value='processed'>Processed</option>
              <option value='finished'>Finished</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='text-muted' htmlFor='appType'>
              App type
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <select
              name='appType'
              className='form-control'
              id='appType'
              value={appType}
              onChange={handleValues}
              required>
              <option value=''>Please select app type</option>
              <option value='Web'>Web</option>
              <option value='Mobile'>Mobile</option>
              <option value='Desktop'>Desktop</option>
            </select>
          </div>

          <button
            className='btn btn-outline-primary mt-2 col-12 col-sm-6 col-md-4 col-lg-3'
            style={{ marginBottom: '40px' }}>
            {add ? 'Add Project' : 'Edit project'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProjectModal;
