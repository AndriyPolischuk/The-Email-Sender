import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const TextAreaRequirements = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        type='button'
        className='btn btn-danger col-12 col-sm-6 col-md-4 col-lg-3 mb-3 pull-right'
        style={{ color: 'black' }}
        onClick={handleShow}>
        Text Area Requirements
      </Button>

      <Modal
        show={show}
        size='lg'
        onHide={handleClose}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 style={{ color: 'red' }}>
              The rules you will need to follow to make sure you do not face any
              issues when sending out the emails.
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              marginLeft: '10px',
              marginRight: '10px',
              fontSize: '12px',
            }}>
            <p>
              The second word in the email should be `businessName` followed by
              comma and space. It's kind of a variable and it'll be replaced
              with a corresponding company name automatically. Please see an
              example.
            </p>

            <h6>
              {' '}
              <i>Dear businessName, </i>
            </h6>
            <p>
              <i>we are a software development company based in Ukraine...</i>
            </p>

            <p style={{ color: 'red' }} className='mt-3'>
              Unless the rules are adhered to, there will be an error thrown up
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TextAreaRequirements;
