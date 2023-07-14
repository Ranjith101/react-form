import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/register.css';
const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const password = watch('password');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    reset();
  };

  const formClass = submitted ? 'form submitted' : 'form';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          {...register('name', { required: true })}
          id="name"
          className={errors.name && 'error'}
          onBlur={() => {
            errors.name && document.getElementById('name').focus();
          }}
        />
        {errors.name && <span className="error">This field is required.</span>}
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile:</label>
        <input
          {...register('mobile', { required: true, pattern: /^[0-9+-]+$/ })}
          id="mobile"
          className={errors.mobile && 'error'}
          onBlur={() => {
            errors.mobile && document.getElementById('mobile').focus();
          }}
        />
        {errors.mobile && <span className="error">Invalid mobile number.</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          id="email"
          className={errors.email && 'error'}
          onBlur={() => {
            errors.email && document.getElementById('email').focus();
          }}
        />
        {errors.email && <span className="error">Invalid email address.</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          {...register('password', {
            required: true,
            pattern: /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[A-Z]).{8,}$/,
          })}
          id="password"
          className={errors.password && 'error'}
          onBlur={() => {
            errors.password && document.getElementById('password').focus();
          }}
        />
        {errors.password && (
          <span className="error">
            Password should contain at least 1 special character, 1 capital letter, 1 number, and be at least 8 characters long.
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="reEnterPassword">Re-enter Password:</label>
        <input
          {...register('reEnterPassword', {
            required: true,
            validate: (value) => value === password || "Passwords don't match.",
          })}
          id="reEnterPassword"
          className={errors.reEnterPassword && 'error'}
          onBlur={() => {
            errors.reEnterPassword && document.getElementById('reEnterPassword').focus();
          }}
        />
        {errors.reEnterPassword && (
          <span className="error">{errors.reEnterPassword.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="selectField">Gender:</label>
        <select {...register('selectField')} id="selectField" className="select-field">
          <option value="option1">Male</option>
          <option value="option2">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <input type="radio" value="option1" {...register('radioField')} className="radio-field" />
          Married
        </label>
        <label>
          <input type="radio" value="option2" {...register('radioField')} className="radio-field" />
          Single
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            {...register('checkboxField', { required: true })}
            className="checkbox-field"
          />
          Checkbox Field
        </label>
        {errors.checkboxField && (
          <span className="error">This checkbox field is mandatory.</span>
        )}
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
