import React, { useState, useEffect } from 'react';

const AnalyticsCard = ({ values }) => {
  const {
    numOfSentEmails,
    numOfPendingEmails,
    numOfCancelledEmails,
    numOfClients,
    numOfProjects,
    leadToClientConversion,
    projectsPerClient,
    numOfSentEmailsThisMonth,
  } = values;

  return (
    <form
      className='form col-8 col-sm-8 col-md-8 col-lg-8  no-pad'
      style={{ marginBottom: '30px' }}>
      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-4 '>
          <div
            className='card   '
            style={{
              height: '120px',
              backgroundColor: 'rgba(45, 67, 38, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(45, 67, 38, 1)',
                }}>
                {' '}
                Total emails sent: <span> {numOfSentEmails}</span>
              </h5>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(127, 134, 49, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(127, 134, 49, 1)',
                }}>
                Number of pending emails: <span>{numOfPendingEmails}</span>
              </h5>
            </div>
          </div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(134, 49, 55, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(134, 49, 55, 1)',
                }}>
                Number of cancelled emails: <span>{numOfCancelledEmails}</span>
              </h5>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(24, 44, 11, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(24, 44, 11, 1)',
                }}>
                Number of clients: {numOfClients}
              </h5>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(19, 18, 184, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(19, 18, 184, 1)',
                }}>
                Number of projects: {numOfProjects}
              </h5>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(19, 19, 20, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(19, 19, 20, 1)',
                }}>
                Lead to client conversion:{' '}
                {!leadToClientConversion ? '0%' : leadToClientConversion + '%'}
              </h5>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(170, 20, 143, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(170, 20, 143, 1)',
                }}>
                Projects per client:{' '}
                {!projectsPerClient ? 0 : projectsPerClient}
              </h5>
            </div>
          </div>
        </div>

        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div
            className='card '
            style={{
              height: '120px',
              backgroundColor: 'rgba(170, 20, 143, 0.3)',
              marginTop: '15px',
            }}>
            <div className='card-body'>
              <h5
                style={{
                  color: 'rgba(17, 206, 14, 1)',
                }}>
                Emails sent this month: {numOfSentEmailsThisMonth}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AnalyticsCard;
