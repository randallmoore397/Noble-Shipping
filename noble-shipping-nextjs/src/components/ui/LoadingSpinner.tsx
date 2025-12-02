interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  text = 'Loading...' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className="text-center">
        <div 
          className={`spinner-border text-${color} ${sizeClasses[size]}`} 
          role="status"
        >
          <span className="visually-hidden">{text}</span>
        </div>
        {text && <div className="mt-2">{text}</div>}
      </div>
    </div>
  );
}