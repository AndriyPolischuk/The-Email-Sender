import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import FullFilter from '../components/FullFilter';
import { searchForLeads } from '../externalAPIs/backendAPIs';
import { stopSendingAllLeads } from '../externalAPIs/backendAPIs';
import { resubmitAllLeads } from '../externalAPIs/backendAPIs';
import { stopSendingOneLead } from '../externalAPIs/backendAPIs';
import { resubmitOneLead } from '../externalAPIs/backendAPIs';
import { makeClient } from '../externalAPIs/backendAPIs';

const MyLeads = () => {
  const [values, setValues] = useState({
    searchBarValue: '',
    leadStatus: '',
    city: '',
    uploadedFrom: '',
    uploadedTill: '',
    loading: false,
    error: '',
    success: '',
    leads: [],
    pendingLeads: 0,
    cancelledLeads: 0,
    pageNumber: 0,
    leadsCount: 0,
    initialPage: 0,
    showThreeBarsModal: false,
    shouldShowMakeClientModal: false,
    country: '',
    state: '',
    comment: '',
    makeClientId: '',
  });

  let {
    searchBarValue,
    leadStatus,
    city,
    uploadedFrom,
    uploadedTill,
    loading,
    error,
    success,
    leads,
    pendingLeads,
    cancelledLeads,
    pageNumber,
    leadsCount,
    initialPage,
    showThreeBarsModal,
    shouldShowMakeClientModal,
    country,
    state,
    comment,
    makeClientId,
  } = values;

  const leadsPerPage = 10;
  const pagesVisited = pageNumber * leadsPerPage;
  let pageCount = Math.ceil(leadsCount / leadsPerPage);

  const form = {
    searchBarValue,
    leadStatus,
    city,
    uploadedFrom,
    uploadedTill,
    leadsPerPage,
    pagesVisited,
  };

  const promise = () => {
    return data => {
      if (data.error) {
        setValues({
          ...values,
          loading: false,
          error: data.error,
          success: '',
          leads: [],
          pendingLeads: 0,
          cancelledLeads: 0,
          leadsCount: 0,
          showThreeBarsModal: false,
          shouldShowMakeClientModal: false,
        });
      } else {
        if (data.data.length > 0) {
          setValues({
            ...values,
            loading: false,
            success: data.success,
            error: '',
            leads: data.data,
            pendingLeads: data.pendingLeads,
            cancelledLeads: data.cancelledLeads,
            leadsCount: data.leadsCount,
            showThreeBarsModal: false,
            shouldShowMakeClientModal: false,
            country: '',
            state: '',
            comment: '',
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: 'No leads found',
            success: '',
            leads: [],
            pendingLeads: 0,
            cancelledLeads: 0,
            leadsCount: 0,
            showThreeBarsModal: false,
            shouldShowMakeClientModal: false,
            country: '',
            state: '',
            comment: '',
          });
        }
      }
    };
  };

  function getData() {
    setValues({ ...values, loading: true });
    searchForLeads(form).then(promise());
  }

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getData();
    }
  }, [pageNumber]);

  const changePage = ({ selected }) => {
    setValues({
      ...values,
      pageNumber: selected,
      initialPage: selected,
    });
  };

  const handleValues = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    pageNumber === 0
      ? getData()
      : setValues({
          ...values,
          pageNumber: 0,
          initialPage: 0,
        });
  };

  const Loading = () => {
    return loading && <h2>...Loading</h2>;
  };

  const Error = () => {
    return error && <h2 style={{ color: 'red' }}>{error}</h2>;
  };

  const Success = () => {
    return success && <h2 style={{ color: 'green' }}>{success}</h2>;
  };

  const handleShowThreeBarsModal = () => {
    setValues({ ...values, showThreeBarsModal: true });
  };

  const handleCloseThreeBarsModal = () => {
    setValues({ ...values, showThreeBarsModal: false });
  };

  const cancelSendingEmails = () => {
    setValues({ ...values, loading: true, showThreeBarsModal: false });
    stopSendingAllLeads(form).then(promise());
  };
  const resendCancelledEmails = () => {
    setValues({ ...values, loading: true, showThreeBarsModal: false });
    resubmitAllLeads(form).then(promise());
  };

  const cancelSendingOneEmail = id => {
    stopSendingOneLead(form, id).then(promise());
  };

  const resendOneLead = id => {
    resubmitOneLead(form, id).then(promise());
  };

  const showMakeClientModal = id => {
    setValues({ ...values, shouldShowMakeClientModal: true, makeClientId: id });
  };

  const handleCloseMakeClientModal = () => {
    setValues({
      ...values,
      shouldShowMakeClientModal: false,
      makeClientId: '',
    });
  };

  const handleMakeClient = event => {
    event.preventDefault();
    event.stopPropagation();
    const data = {
      ...form,
      country,
      state,
      comment,
      makeClientId,
    };
    setValues({ ...values, loading: true, shouldShowMakeClientModal: false });
    makeClient(data).then(promise());
  };

  return (
    <Layout title='My Leads'>
      <FullFilter
        searchBarValue={searchBarValue}
        leadStatus={leadStatus}
        city={city}
        uploadedFrom={uploadedFrom}
        uploadedTill={uploadedTill}
        handleValues={handleValues}
        handleSubmit={handleSubmit}
        cancelSendingEmails={cancelSendingEmails}
        resendCancelledEmails={resendCancelledEmails}
        Loading={Loading}
        Error={Error}
        Success={Success}
        leads={leads}
        pageCount={pageCount}
        changePage={changePage}
        leadsCount={leadsCount}
        initialPage={initialPage}
        pendingLeads={pendingLeads}
        cancelledLeads={cancelledLeads}
        showThreeBarsModal={showThreeBarsModal}
        shouldShowMakeClientModal={shouldShowMakeClientModal}
        handleShowThreeBarsModal={handleShowThreeBarsModal}
        handleCloseThreeBarsModal={handleCloseThreeBarsModal}
        cancelSendingOneEmail={cancelSendingOneEmail}
        resendOneLead={resendOneLead}
        showMakeClientModal={showMakeClientModal}
        handleCloseMakeClientModal={handleCloseMakeClientModal}
        country={country}
        state={state}
        comment={comment}
        handleMakeClient={handleMakeClient}
      />
    </Layout>
  );
};

export default MyLeads;
