import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ThreeBarsModal = ({
  pendingLeads,
  cancelledLeads,
  cancelSendingEmails,
  resendCancelledEmails,
  showThreeBarsModal,
  handleShowThreeBarsModal,
  handleCloseThreeBarsModal,
}) => {
  return (
    <>
      <i
        className='fa fa-bars pull-right'
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          fontSize: '26px',
          color: 'red',
          cursor: 'pointer',
        }}
        onClick={handleShowThreeBarsModal}></i>
      <Modal
        id='ThreeBarsModal'
        show={showThreeBarsModal}
        size='lg'
        onHide={handleCloseThreeBarsModal}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {pendingLeads ? (
              <h6 style={{ color: 'red' }}>
                There are {pendingLeads} pending leads found. You can stop
                sending them by tapping on the red button.
              </h6>
            ) : (
              ''
            )}
            {cancelledLeads ? (
              <h6 style={{ color: '#735519' }}>
                There are {cancelledLeads} cancelled leads found. You can
                resubmit them by tapping on the yellow button.
              </h6>
            ) : (
              ''
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            {pendingLeads ? (
              <div className='col text-center pull-left'>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={cancelSendingEmails}>
                  Stop sending emails
                </Button>
              </div>
            ) : (
              ''
            )}

            {cancelledLeads ? (
              <div className='col text-center pull-right'>
                <Button
                  style={{ backgroundColor: '#735519' }}
                  size='sm'
                  onClick={resendCancelledEmails}>
                  Resubmit emails
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ThreeBarsModal;
