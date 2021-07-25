import React from 'react';
import FileRequirementsModal from './FileRequirementsModal';
import TextAreaRequirements from './TextAreaRequirements';

const SendEmailsForm = ({
  isLoading,
  showSuccess,
  showError,
  handleChange,
  emailContent,
  handleSubmit,
  industry,
  formData,
  removeFile,
  subject,
  delay,
}) => {
  return (
    <form
      className='form col-8 col-sm-8 col-md-8 col-lg-8  no-pad'
      onSubmit={handleSubmit}>
      {isLoading()}
      {showSuccess()}
      {showError()}
      <FileRequirementsModal />
      <div className='form-group'>
        <div className='inputContainer'>
          <label className='text-muted' htmlFor='industry'>
            Industry
          </label>{' '}
          <em
            className='fa fa-asterisk asterisk'
            style={{ fontSize: 'small', color: 'red' }}></em>
          <select
            name='industry'
            className='form-control'
            id='industry'
            value={industry}
            onChange={handleChange}
            required>
            <option value=''>Please select industry</option>
            <option value='Construction'>Construction</option>
            <option value='Healthcare'>Healthcare</option>
            <option value='Home Services'>Home Services</option>
            <option value='Financial Services'>Financial Services</option>
            <option value='Legal Services'>Legal Services</option>
            <option value='Property'>Property</option>
            <option value='Security'>Security</option>
            <option value='Software Development'>Software Development</option>
            <option value='Trucking Services'>Trucking Services</option>
          </select>
        </div>
      </div>
      <TextAreaRequirements />
      <div className='form-group '>
        <label className='text-muted' htmlFor='name'>
          Email Content
        </label>{' '}
        <em
          className='fa fa-asterisk asterisk'
          style={{ fontSize: 'small', color: 'red' }}>
          {'  '}
        </em>
        <textarea
          id='EmailContent'
          name='EmailContent'
          type='text'
          className='form-control'
          placeholder='Message goes here. Must be min. 120 character long.'
          minLength='50'
          rows='4'
          cols='150'
          onChange={handleChange}
          value={emailContent}
          required
        />
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='subject'>
          Email subject
        </label>{' '}
        <em
          className='fa fa-asterisk asterisk'
          style={{ fontSize: 'small', color: 'red' }}></em>
        <input
          id='subject'
          onChange={handleChange}
          name='subject'
          className='form-control'
          type='text'
          value={subject}
          placeholder='Enter email subject'
          required
        />
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='delay'>
          Delay
        </label>{' '}
        <em
          className='fa fa-asterisk asterisk'
          style={{ fontSize: 'small', color: 'red' }}></em>
        <input
          id='delay'
          style={{ maxWidth: '200px' }}
          onChange={handleChange}
          name='delay'
          className='form-control'
          type='number'
          value={delay}
          placeholder='Delay in minutes'
          min='0'
          required
        />
      </div>

      <div className='form-group '>
        {!formData && (
          <label htmlFor='SCV' style={{ color: 'red' }}>
            SCV file only
          </label>
        )}
        <br></br>
        <input
          id='SCV'
          type='file'
          accept='.csv'
          name='SCV'
          placeholder='SCV file only'
          style={{ color: 'blue' }}
          onChange={handleChange}
        />
      </div>
      {formData && (
        <button
          className='btn-danger btn mb-2 col-12 col-sm-6 col-md-4 col-lg-3'
          type='button'
          onClick={removeFile}>
          Remove CSV file
        </button>
      )}
      <br></br>
      {formData && emailContent && emailContent.length > 49 && (
        <button
          className='btn btn-outline-primary mt-2 col-12 col-sm-6 col-md-4 col-lg-3'
          style={{ marginBottom: '60px' }}>
          Send Emails
        </button>
      )}
    </form>
  );
};

export default SendEmailsForm;
