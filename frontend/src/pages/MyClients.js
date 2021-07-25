import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ClientsFilters from '../components/ClientsFilters';
import ClientsCard from '../components/ClientsCard';
import ReactPaginate from 'react-paginate';
import { searchForClients } from '../externalAPIs/backendAPIs';

const MyClients = props => {
  const [values, setValues] = useState({
    searchBarValue: '',
    loading: false,
    error: '',
    success: '',
    clients: [],
    pageNumber: 0,
    clientsCount: 0,
    initialPage: 0,
    country: '',
    state: '',
    city: '',
    from: '',
    till: '',
  });

  let {
    searchBarValue,
    loading,
    error,
    success,
    clients,
    pageNumber,
    clientsCount,
    initialPage,
    country,
    state,
    city,
    from,
    till,
  } = values;

  const leadsPerPage = 10;
  let pagesVisited = pageNumber * leadsPerPage;
  let pageCount = Math.ceil(clientsCount / leadsPerPage);

  const form = {
    searchBarValue,
    country,
    state,
    city,
    from,
    till,
    leadsPerPage,
    pagesVisited,
    pageNumber,
  };

  const promise = () => {
    return data => {
      if (data.error) {
        setValues({
          ...values,
          loading: false,
          error: data.error,
          success: '',
          clients: [],
          clientsCount: 0,
          run: false,
        });
      } else {
        if (data.data.length > 0) {
          setValues({
            ...values,
            loading: false,
            success: data.success,
            error: '',
            clients: data.data,
            clientsCount: data.clientsCount,
            run: false,
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: 'No clients found',
            success: '',
            clients: [],
            clientsCount: 0,
            run: false,
          });
        }
      }
    };
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getData();
    }
  }, [pageNumber]);

  function getData() {
    setValues({ ...values, loading: true });
    searchForClients(form).then(promise());
  }

  const Loading = () => {
    return loading && <h2>...Loading</h2>;
  };

  const Success = () => {
    return success && <h2 style={{ color: 'green' }}>{success}</h2>;
  };

  const Error = () => {
    return error && <h2 style={{ color: 'red' }}>{error}</h2>;
  };

  const handleValues = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const changePage = ({ selected }) => {
    setValues({
      ...values,
      pageNumber: selected,
      initialPage: selected,
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

  return (
    <Layout title='My Clients'>
      <div className='row  mr-5'>
        <div className='container justify-content-center '>
          <form
            className='form col-8 col-sm-8 col-md-8 col-lg-8 no-pad'
            onSubmit={handleSubmit}>
            <Loading />
            <Success />
            <Error />
            {!country && !state && !city && !from && !till && (
              <SearchBar
                searchBarValue={searchBarValue}
                handleValues={handleValues}
              />
            )}
            {!searchBarValue && (
              <ClientsFilters
                country={country}
                state={state}
                city={city}
                from={from}
                till={till}
                handleValues={handleValues}
              />
            )}

            <button className='btn btn-primary  btn-block mt-4'>
              Search For Clients
            </button>

            {clients.length > 0 &&
              clients.map(client => (
                <div
                  key={client._id}
                  className='col-lg-12 col-sm-12 col-md-12 mb-3'
                  style={{
                    fontSize: '10px',
                    marginTop: '15px',
                    marginBottom: '30px',
                    padding: '0',
                  }}>
                  <ClientsCard client={client} />
                </div>
              ))}

            {clientsCount > 10 && (
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
    </Layout>
  );
};

export default MyClients;
