import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const FileRequirementsModal = () => {
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
        File Requirements
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
            <p>1) The CSV file should have 4 columns only.</p>
            <p>
              2) All the column headers should have exactly the same names like
              in the example below.
            </p>
            <p>3) The file should be structured like so:</p>
            <Table striped bordered hover responsive size='sm'>
              <thead>
                <tr>
                  <th>businessName</th>
                  <th>website </th>
                  <th>telephone</th>
                  <th>location</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Andriy_lab_1</td>
                  <td>Andriy_lab_1.com</td>
                  <td>+38962029101</td>
                  <td>Suiemtsi</td>
                  <td>Andriy_lab_1@gmail.com</td>
                </tr>
                <tr>
                  <td>Andriy_lab_2</td>
                  <td>Andriy_lab_2.com</td>
                  <td>+38962029102</td>
                  <td>Suiemtsi</td>
                  <td>Andriy_lab_2@gmail.com</td>
                </tr>
                <tr>
                  <td>Andriy_lab_3</td>
                  <td>Andriy_lab_3.com</td>
                  <td>+38962029103</td>
                  <td>Suiemtsi</td>
                  <td>Andriy_lab_3@gmail.com</td>
                </tr>
                <tr>
                  <td>Andriy_lab_4</td>
                  <td>Andriy_lab_4.com</td>
                  <td>+38962029104</td>
                  <td>Suiemtsi</td>
                  <td>Andriy_lab_4@gmail.com</td>
                </tr>
                <tr>
                  <td>Andriy_lab_5</td>
                  <td>Andriy_lab_5.com</td>
                  <td>+38962029105</td>
                  <td>Suiemtsi</td>
                  <td>Andriy_lab_5@gmail.com</td>
                </tr>
              </tbody>
            </Table>
            <p style={{ color: 'red' }} className='mt-3'>
              Unless the rules are adhered to, there will be an error thrown up
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FileRequirementsModal;
