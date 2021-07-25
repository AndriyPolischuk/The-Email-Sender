import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const MakeClientModal = ({
  shouldShowMakeClientModal,
  country,
  state,
  comment,
  handleCloseThreeBarsModal,
  handleValues,
  handleMakeClient,
}) => {
  return (
    <Modal
      id='ThreeBarsModal'
      show={shouldShowMakeClientModal}
      size='lg'
      onHide={handleCloseThreeBarsModal}
      backdrop='static'
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title style={{}}>Please fill out the form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleMakeClient}>
          <div className='form-group'>
            <label className='text-muted' htmlFor='country'>
              Country
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <input
              id='country'
              name='country'
              className='form-control'
              type='text'
              placeholder='Enter country'
              value={country}
              onChange={handleValues}
              required
            />
          </div>
          <div className='form-group'>
            <label className='text-muted' htmlFor='state'>
              State
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <input
              id='state'
              name='state'
              className='form-control'
              type='text'
              placeholder='Enter state or province'
              value={state}
              onChange={handleValues}
              required
            />
          </div>
          <div className='form-group'>
            <label className='text-muted' htmlFor='comment'>
              Comment
            </label>{' '}
            <em
              className='fa fa-asterisk asterisk'
              style={{ fontSize: 'small', color: 'red' }}></em>
            <textarea
              id='comment'
              name='comment'
              type='text'
              className='form-control'
              placeholder='Message goes here. Must be min. 20 characters long.'
              minLength='50'
              rows='4'
              cols='150'
              value={comment}
              onChange={handleValues}
              required
            />
          </div>
          <button
            className='btn btn-outline-primary mt-2 col-12 col-sm-6 col-md-4 col-lg-3'
            style={{ marginBottom: '40px' }}>
            Make Client
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default MakeClientModal;
