import React from 'react'
import '../styles/components/FormField.css'

const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  helpText = '',
  size = 'medium',
  variant = 'default',
  icon = null,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`
  
  const getFieldClasses = () => {
    let classes = 'form-field'
    
    classes += ` form-field--${variant}`
    classes += ` form-field--${size}`
    
    if (error) classes += ' form-field--error'
    if (disabled) classes += ' form-field--disabled'
    if (icon) classes += ` form-field--icon-${iconPosition}`
    
    if (className) classes += ` ${className}`
    
    return classes
  }

  const getInputClasses = () => {
    let classes = 'form-field__input'
    
    if (icon) classes += ' form-field__input--with-icon'
    
    return classes
  }

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={fieldId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={getInputClasses()}
          {...props}
        />
      )
    }

    if (type === 'select') {
      return (
        <select
          id={fieldId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={getInputClasses()}
          {...props}
        >
          {children}
        </select>
      )
    }

    return (
      <input
        type={type}
        id={fieldId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={getInputClasses()}
        {...props}
      />
    )
  }

  return (
    <div className={getFieldClasses()}>
      {label && (
        <label htmlFor={fieldId} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      
      <div className="form-field__input-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="form-field__icon form-field__icon--left">
            {icon}
          </span>
        )}
        
        {renderInput()}
        
        {icon && iconPosition === 'right' && (
          <span className="form-field__icon form-field__icon--right">
            {icon}
          </span>
        )}
      </div>
      
      {error && (
        <span className="form-field__error">{error}</span>
      )}
      
      {helpText && !error && (
        <span className="form-field__help">{helpText}</span>
      )}
    </div>
  )
}

export default FormField