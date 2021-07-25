import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import LeadsFilters from '../components/LeadsFilters';
import LeadsCard from '../components/LeadsCard';
import ReactPaginate from 'react-paginate';
import ThreeBarsModal from './ThreeBarsModal';
import MakeClientModal from './MakeClientModal';

const FullFilter = ({
  searchBarValue,
  leadStatus,
  city,
  uploadedFrom,
  uploadedTill,
  handleValues,
  handleSubmit,
  cancelSendingEmails,
  resendCancelledEmails,
  Loading,
  Error,
  Success,
  leads,
  pageCount,
  changePage,
  leadsCount,
  initialPage,
  pendingLeads,
  cancelledLeads,
  showThreeBarsModal,
  shouldShowMakeClientModal,
  handleShowThreeBarsModal,
  handleCloseThreeBarsModal,
  cancelSendingOneEmail,
  resendOneLead,
  showMakeClientModal,
  handleCloseMakeClientModal,
  country,
  state,
  comment,
  handleMakeClient,
}) => {
  return (
    <div className='row  mr-5'>
      <div className='container justify-content-center '>
        <form
          className='form col-8 col-sm-8 col-md-8 col-lg-8 no-pad'
          onSubmit={handleSubmit}>
          <Loading />
          <Success />
          <Error />
          {!leadStatus && !city && !uploadedFrom && !uploadedTill && (
            <SearchBar
              searchBarValue={searchBarValue}
              handleValues={handleValues}
            />
          )}
          {!searchBarValue && (
            <LeadsFilters
              leadStatus={leadStatus}
              city={city}
              uploadedFrom={uploadedFrom}
              uploadedTill={uploadedTill}
              handleValues={handleValues}
            />
          )}

          <button className='btn btn-primary  btn-block mt-4'>
            Search For Leads
          </button>

          {(pendingLeads > 0 || cancelledLeads > 0) && (
            <ThreeBarsModal
              pendingLeads={pendingLeads}
              cancelledLeads={cancelledLeads}
              cancelSendingEmails={cancelSendingEmails}
              resendCancelledEmails={resendCancelledEmails}
              showThreeBarsModal={showThreeBarsModal}
              handleShowThreeBarsModal={handleShowThreeBarsModal}
              handleCloseThreeBarsModal={handleCloseThreeBarsModal}
            />
          )}
          <MakeClientModal
            shouldShowMakeClientModal={shouldShowMakeClientModal}
            handleCloseThreeBarsModal={handleCloseMakeClientModal}
            country={country}
            state={state}
            comment={comment}
            handleValues={handleValues}
            handleMakeClient={handleMakeClient}
          />
          {leads.length > 0 && (
            <LeadsCard
              leads={leads}
              cancelSendingOneEmail={cancelSendingOneEmail}
              resendOneLead={resendOneLead}
              showMakeClientModal={showMakeClientModal}
            />
          )}

          {leadsCount > 10 && (
            <div style={{ marginTop: '30px' }}>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'paginationBttns'}
                previousLinkClassName={'previousBttn'}
                nextLinkClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
                initialPage={initialPage}
                forcePage={initialPage}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FullFilter;
