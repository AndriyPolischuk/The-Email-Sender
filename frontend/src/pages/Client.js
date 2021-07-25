import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getClientById } from '../externalAPIs/backendAPIs';
import { addProject } from '../externalAPIs/backendAPIs';
import { editProject } from '../externalAPIs/backendAPIs';
import ClientComponent from '../components/ClientComponent';

const Client = props => {
  const [values, setValues] = useState({
    client: {},
    projects: [],
    loading: false,
    success: '',
    error: '',
    shouldShowAddProjectModal: false,
    projectName: '',
    industry: '',
    status: '',
    appType: '',
    projectId: '',
    add: false,
    edit: false,
  });

  const {
    client,
    projects,
    loading,
    success,
    error,
    shouldShowAddProjectModal,
    projectName,
    industry,
    status,
    appType,
    projectId,
    add,
    edit,
  } = values;

  const promise = () => {
    return data => {
      if (data.error) {
        setValues({
          ...values,
          projectName: '',
          industry: '',
          status: '',
          appType: '',
          projectId: '',
          loading: false,
          error: data.error,
          shouldShowAddProjectModal: false,
          add: false,
          edit: false,
        });
      } else {
        setValues({
          ...values,
          projects: data.projects,
          success: data.success,
          loading: false,
          projectName: '',
          industry: '',
          status: '',
          appType: '',
          projectId: '',
          shouldShowAddProjectModal: false,
          add: false,
          edit: false,
        });
      }
    };
  };
  const clientId = props.match.params.clientId;

  const getClient = () => {
    setValues({ ...values, loading: true });
    getClientById(clientId).then(data => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({
          ...values,
          loading: false,
          client: data.client,
          projects: data.projects,
        });
      }
    });
  };

  React.useEffect(() => {
    getClient();
  }, []);

  const Loading = () => {
    return loading && <h2>...Loading</h2>;
  };

  const Error = () => {
    return error && <h2 style={{ color: 'red' }}>{error}</h2>;
  };

  const Success = () => {
    return success && <h2 style={{ color: 'green' }}>{success}</h2>;
  };

  const handleShowAddProjectModal = () => {
    setValues({ ...values, shouldShowAddProjectModal: true, add: true });
  };

  const handleCloseAddProjectModal = () => {
    setValues({
      ...values,
      shouldShowAddProjectModal: false,
      projectName: '',
      industry: '',
      status: '',
      appType: '',
      projectId: '',
      add: false,
      edit: false,
    });
  };

  const handleValues = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmitProject = event => {
    event.preventDefault();
    event.stopPropagation();
    if (projectId) {
      setValues({ ...values, loading: true, shouldShowAddProjectModal: false });
      const obj = {
        projectName,
        industry,
        status,
        appType,
        projectId,
        clientId,
      };
      editProject(obj).then(promise());
    } else {
      const form = {
        projectName,
        industry,
        status,
        appType,
        clientId,
      };
      setValues({ ...values, loading: true, shouldShowAddProjectModal: false });
      addProject(form).then(promise());
    }
  };

  const handleEditProject = projectId => {
    const project = projects.find(obj => obj._id === projectId);
    setValues({
      ...values,
      projectName: project.projectName,
      industry: project.industry,
      status: project.status,
      appType: project.appType,
      shouldShowAddProjectModal: true,
      projectId: projectId,
      edit: true,
    });
  };

  return (
    <Layout title={client.businessName ? `${client.businessName}` : ''}>
      {Loading()}
      {Success()}
      {Error()}
      {!loading && (
        <ClientComponent
          client={client}
          projects={projects}
          shouldShowAddProjectModal={shouldShowAddProjectModal}
          handleShowAddProjectModal={handleShowAddProjectModal}
          handleCloseAddProjectModal={handleCloseAddProjectModal}
          handleValues={handleValues}
          handleSubmitProject={handleSubmitProject}
          handleEditProject={handleEditProject}
          projectName={projectName}
          projectIndustry={industry}
          status={status}
          appType={appType}
          add={add}
          edit={edit}
        />
      )}
    </Layout>
  );
};

export default Client;
