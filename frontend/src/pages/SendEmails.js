import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SendEmailsForm from '../components/SendEmailsForm';
import { sendEmails } from '../externalAPIs/backendAPIs';

const SendEmails = () => {
  const [industry, setIndustry] = useState('');
  const [emailContent, setEmailConent] = useState('');
  const [subject, setSubject] = useState('');
  const [delay, setDelay] = useState('');
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = event => {
    if (event.target.name === 'EmailContent') {
      setEmailConent(event.target.value);
    } else if (event.target.name === 'SCV') {
      setFormData(event.target.files[0]);
    } else if (event.target.name === 'delay') {
      setDelay(event.target.value);
    } else if (event.target.name === 'subject') {
      setSubject(event.target.value);
    } else {
      setIndustry(event.target.value);
    }
  };

  const removeFile = () => {
    console.dir(document.getElementById('SCV'));
    const result = window.confirm('Do you really want to remove the file?');
    if (result) {
      document.getElementById('SCV').value = '';
      setFormData('');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const form = new FormData();
    form.set('industry', industry);
    form.set('emailContent', emailContent);
    form.set('subject', subject);
    form.set('delay', delay);
    form.set('file', formData);
    sendEmails(form).then(data => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
        setIndustry('');
        setEmailConent('');
        setSubject('');
        setDelay('');
        setFormData('');
        document.getElementById('SCV').value = '';
      } else if (data.success) {
        setLoading(false);
        setSuccess(true);
        setIndustry('');
        setEmailConent('');
        setSubject('');
        setDelay('');
        setFormData('');
        document.getElementById('SCV').value = '';
      }
    });
  };

  const isLoading = () => {
    return (
      loading && (
        <h2 style={{ marginBottom: '20px', color: '#294d33' }}>...Loading</h2>
      )
    );
  };

  const showSuccess = () => {
    return success && <h2 style={{ color: 'green' }}>Emails sent</h2>;
  };

  const showError = () => {
    return error && <h2 style={{ color: 'red' }}>{error}</h2>;
  };

  return (
    <Layout title='Send Emails'>
      <SendEmailsForm
        isLoading={isLoading}
        showSuccess={showSuccess}
        showError={showError}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        removeFile={removeFile}
        industry={industry}
        emailContent={emailContent}
        subject={subject}
        delay={delay}
        formData={formData}
      />
    </Layout>
  );
};

export default SendEmails;
