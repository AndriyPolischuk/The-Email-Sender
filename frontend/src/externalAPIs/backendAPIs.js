export const sendEmails = form => {
  return fetch(`/api/v1/emails/sendEmails`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },

    body: form,
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const searchForLeads = data => {
  return fetch(`/api/v1/emails/searchForLeads`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const stopSendingAllLeads = data => {
  return fetch(`/api/v1/emails/stopSendingAllLeads`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const resubmitAllLeads = data => {
  return fetch(`/api/v1/emails/resubmitAllLeads`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const stopSendingOneLead = (data, id) => {
  data.id = id;
  return fetch(`/api/v1/emails/stopSendingOneLead`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const resubmitOneLead = (data, id) => {
  data.id = id;
  return fetch(`/api/v1/emails/resubmitOneLead`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const makeClient = data => {
  return fetch(`/api/v1/emails/makeClient`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const searchForClients = data => {
  return fetch(`/api/v1/clients/searchForClients`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getClientById = clientId => {
  return fetch(`/api/v1/clients/getClientById/${clientId}`, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const addProject = data => {
  return fetch(`/api/v1/clients/addProject`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const editProject = data => {
  return fetch(`/api/v1/clients/editProject`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getAnalytics = () => {
  return fetch(`/api/v1/analytics/getAnalytics`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
