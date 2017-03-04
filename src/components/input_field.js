import React from 'react';

function renderLabel(field) {
  if (field.label) {
    return <label className="control-label" htmlFor={field.input.name}>{field.label}</label>;
  }
}

export default function Inputfield(field) {
  return (
    <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : '' }`}>
      {renderLabel(field)}
      <input {...field.input} placeholder={field.placeholder} type={field.type} className="form-control"/>

      <div className="help-block">
        {field.meta.touched && field.meta.error ? field.meta.error : ''}
      </div>

    </div>
  );
}
