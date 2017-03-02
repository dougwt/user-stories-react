import React from 'react';

export default function Inputfield(field) {
  return (
    <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : '' }`}>

      <label className="control-label" htmlFor={field.input.name}>{field.label}</label>

      <input {...field.input} placeholder={field.placeholder} type={field.type} className="form-control"/>

      <div className="help-block">
        {field.meta.touched && field.meta.error ? field.meta.error : ''}
      </div>

    </div>
  );
}
