import React, { useState, useEffect } from 'react';
import AddProjectModal from '../components/AddProjectModal';
import ProjectsCard from '../components/ProjectsCard';

const ClientComponent = ({
  client,
  projects,
  shouldShowAddProjectModal,
  handleShowAddProjectModal,
  handleCloseAddProjectModal,
  handleValues,
  handleSubmitProject,
  handleEditProject,
  projectName,
  projectIndustry,
  status,
  appType,
  add,
  edit,
}) => {
  const {
    businessName,
    website,
    telephone,
    location,
    email,
    industry,
    country,
    state,
    comment,
  } = client;

  return (
    <div className='row' style={{ marginBottom: '70px' }}>
      <div className='col-8'>
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: '30px',
          }}>
          <hr></hr>
          <p
            style={{
              backgroundColor: '#99a19b',
              padding: '10px',
              margin: '0px',
            }}>
            Business name: <span className=' pull-right'>{businessName}</span>
          </p>

          <p style={{ padding: '10px', margin: '0px' }}>
            Country: <span className=' pull-right'>{country}</span>
          </p>
          <p
            style={{
              backgroundColor: '#99a19b',
              padding: '10px',
              margin: '0px',
            }}>
            State / Province: <span className=' pull-right'>{state}</span>
          </p>
          <p style={{ padding: '10px', margin: '0px' }}>
            City: <span className=' pull-right'>{location}</span>{' '}
          </p>
          <p
            style={{
              backgroundColor: '#99a19b',
              padding: '10px',
              margin: '0px',
            }}>
            Website: <span className=' pull-right'>{website}</span>
          </p>
          <p style={{ padding: '10px', margin: '0px' }}>
            Phone:<span className=' pull-right'>{telephone}</span>{' '}
          </p>
          <p
            style={{
              backgroundColor: '#99a19b',
              padding: '10px',
              margin: '0px',
            }}>
            E-mail: <span className=' pull-right'>{email}</span>{' '}
          </p>
          <p style={{ padding: '10px', margin: '0px' }}>
            Industry: <span className=' pull-right'>{industry}</span>
          </p>
          <p
            style={{
              backgroundColor: '#99a19b',
              padding: '10px',
              margin: '0px',
            }}>
            Client Brief: {comment}
          </p>
          <hr></hr>
        </div>
        <h6>
          Projects: {projects.length}
          <span
            className='fa fa-plus-circle pull-right'
            onClick={handleShowAddProjectModal}
            style={{
              fontSize: '48px',
              cursor: 'pointer',
              marginBottom: '30px',
            }}
            data-toggle='tooltip'
            data-placement='top'
            title='Add Project'></span>
          <AddProjectModal
            shouldShowAddProjectModal={shouldShowAddProjectModal}
            handleCloseAddProjectModal={handleCloseAddProjectModal}
            handleValues={handleValues}
            handleSubmitProject={handleSubmitProject}
            projectName={projectName}
            industry={projectIndustry}
            status={status}
            appType={appType}
            add={add}
            edit={edit}
          />
        </h6>
        {projects.length > 0 && (
          <ProjectsCard
            projects={projects}
            handleEditProject={handleEditProject}
          />
        )}
      </div>
    </div>
  );
};

export default ClientComponent;
