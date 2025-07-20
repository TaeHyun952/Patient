import React from "react";
import '../styles/components/Button.css';

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const getButtonClasses = () => {
    let classes = "btn";

    // Variant 클래스
    classes += ` btn--${variant}`;

    // Size 클래스
    classes += ` btn--${size}`;

    // 상태 클래스
    if (disabled) classes += " btn--disabled";
    if (loading) classes += " btn--loading";
    if (fullWidth) classes += " btn--full-width";
    if (icon && !children) classes += " btn--icon-only";

    // 아이콘 위치 클래스
    if (icon && children) {
      classes += ` btn--icon-${iconPosition}`;
    }

    // 추가 사용자 정의 클래스
    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <span className="btn__spinner">
          <svg viewBox="0 0 24 24" className="btn__spinner-svg">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
            />
          </svg>
        </span>
      );
    }

    if (icon) {
      return <span className="btn__icon">{icon}</span>;
    }

    return null;
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {iconPosition === "left" && renderIcon()}
      {children && <span className="btn__text">{children}</span>}
      {iconPosition === "right" && renderIcon()}
    </button>
  );
};

// 특별한 버튼 컴포넌트들
const IconButton = ({ icon, ...props }) => {
  return <Button icon={icon} {...props} />;
};

const FloatingActionButton = ({ icon, ...props }) => {
  return (
    <Button
      icon={icon}
      variant="primary"
      size="large"
      className="btn--fab"
      {...props}
    />
  );
};

const LoadingButton = ({ loading = true, ...props }) => {
  return <Button loading={loading} {...props} />;
};

// Button Group 컴포넌트
const ButtonGroup = ({
  children,
  className = "",
  orientation = "horizontal",
  size = "medium",
  variant = "default",
  ...props
}) => {
  const classes = `btn-group btn-group--${orientation} btn-group--${size} btn-group--${variant} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// 내보내기
Button.Icon = IconButton;
Button.Fab = FloatingActionButton;
Button.Loading = LoadingButton;
Button.Group = ButtonGroup;

export default Button;
