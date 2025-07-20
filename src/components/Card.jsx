import React from 'react'
import '../styles/components/Card.css'

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'medium',
  shadow = 'medium',
  hover = true,
  padding = 'default',
  ...props 
}) => {
  const getCardClasses = () => {
    let classes = 'card'
    
    // 기본 variant 클래스 추가
    classes += ` card--${variant}`
    
    // 크기 클래스 추가
    classes += ` card--${size}`
    
    // 그림자 클래스 추가
    classes += ` card--shadow-${shadow}`
    
    // 패딩 클래스 추가
    classes += ` card--padding-${padding}`
    
    // 호버 효과 클래스 추가
    if (hover) {
      classes += ' card--hover'
    }
    
    // 추가 사용자 정의 클래스
    if (className) {
      classes += ` ${className}`
    }
    
    return classes
  }

  return (
    <div className={getCardClasses()} {...props}>
      {children}
    </div>
  )
}

// Card Header 컴포넌트
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  )
}

// Card Content 컴포넌트
const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__content ${className}`} {...props}>
      {children}
    </div>
  )
}

// Card Footer 컴포넌트
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  )
}

// Card Title 컴포넌트
const CardTitle = ({ children, className = '', level = 3, ...props }) => {
  const Tag = `h${level}`
  
  return (
    <Tag className={`card__title card__title--h${level} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

// Card Description 컴포넌트
const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`card__description ${className}`} {...props}>
      {children}
    </p>
  )
}

// Card Actions 컴포넌트
const CardActions = ({ children, className = '', align = 'right', ...props }) => {
  return (
    <div className={`card__actions card__actions--${align} ${className}`} {...props}>
      {children}
    </div>
  )
}

// 내보내기
Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription
Card.Actions = CardActions

export default Card