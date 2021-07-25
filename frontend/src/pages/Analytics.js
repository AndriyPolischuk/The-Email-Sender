import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getAnalytics } from '../externalAPIs/backendAPIs';
import AnalyticsCard from '../components/AnalyticsCard';

const Analytics = () => {
  const [values, setValues] = useState({
    numOfSentEmails: '',
    numOfPendingEmails: '',
    numOfCancelledEmails: '',
    numOfClients: '',
    numOfProjects: '',
    leadToClientConversion: '',
    projectsPerClient: '',
    numOfSentEmailsThisMonth: '',
    renderContent: false,
    loading: false,
    error: '',
  });

  const { renderContent, loading, error } = values;

  const init = () => {
    setValues({ ...values, loading: true });
    return getAnalytics();
  };

  React.useEffect(() => {
    let componentMounted = true;
    const fetchData = () => {
      init().then(data => {
        if (componentMounted) {
          if (data.error) {
            setValues({
              ...values,
              loading: false,
              error: data.error,
              renderContent: false,
            });
          } else {
            setValues({
              ...values,
              loading: false,
              numOfSentEmails: data.numOfSentEmails,
              numOfPendingEmails: data.numOfPendingEmails,
              numOfCancelledEmails: data.numOfCancelledEmails,
              numOfClients: data.numOfClients,
              numOfProjects: data.numOfProjects,
              leadToClientConversion: data.leadToClientConversion,
              projectsPerClient: data.projectsPerClient,
              numOfSentEmailsThisMonth: data.numOfSentEmailsThisMonth,
              renderContent: true,
            });
          }
        }
      });
    };
    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return loading && <h2>...Loading</h2>;
  };

  const Error = () => {
    return error && <h2 style={{ color: 'red' }}>{error}</h2>;
  };

  return (
    <Layout title='Analytics'>
      {Error()}
      {Loading()}
      {renderContent && <AnalyticsCard values={values} />}
    </Layout>
  );
};

export default Analytics;
