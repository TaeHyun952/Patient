import React from 'react'
import '../styles/components/Badge.css'

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  icon = null,
  iconPosition = 'left',
  dot = false,
  pulse = false,
  ...props
}) => {
  const getBadgeClasses = () => {
    let classes = 'badge'
    
    classes += ` badge--${variant}`
    classes += ` badge--${size}`
    
    if (dot) classes += ' badge--dot'
    if (pulse) classes += ' badge--pulse'
    if (icon && !children) classes += ' badge--icon-only'
    if (icon && children) classes += ` badge--icon-${iconPosition}`
    
    if (className) classes += ` ${className}`
    
    return classes
  }

  return (
    <span className={getBadgeClasses()} {...props}>
      {dot && <span className="badge__dot" />}
      {icon && iconPosition === 'left' && (
        <span className="badge__icon">{icon}</span>
      )}
      {children && <span className="badge__text">{children}</span>}
      {icon && iconPosition === 'right' && (
        <span className="badge__icon">{icon}</span>
      )}
    </span>
  )
}

export default Badge