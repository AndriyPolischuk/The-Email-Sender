import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';

const ProjectsCard = ({ projects, handleEditProject }) => {
  return (
    <div style={{ fontSize: '10px', marginTop: '10px', marginBottom: '30px' }}>
      <Table striped bordered hover responsive size='sm'>
        <thead>
          <tr className='text-center'>
            <th>Project Name</th>
            <th>Industry</th>
            <th>App type </th>
            <th>Status</th>
            <th>Created at</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => {
            return (
              <tr key={project._id}>
                <td>{project.projectName}</td>
                <td>{project.industry}</td>
                <td>{project.appType}</td>
                <td>{project.status}</td>
                <td>{moment(project.createdAt).fromNow()}</td>
                <td className='text-center'>
                  <span
                    className='fa fa-edit '
                    onClick={() => handleEditProject(project._id)}
                    style={{ fontSize: '16px', cursor: 'pointer' }}></span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectsCard;
