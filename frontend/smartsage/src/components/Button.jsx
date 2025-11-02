export default function Button({ 
  children, 
  onClick, 
  disabled = false,
  icon,
  variant = 'primary',
  className = '',
  type = 'button',
}) {
  const baseStyles = 'px-6 py-2.5 rounded-xl font-medium transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 focus:ring-blue-500',
    secondary: 'bg-slate-700 text-slate-200 border border-slate-600 hover:bg-slate-600 focus:ring-slate-600',
    icon: 'p-3 rounded-xl bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}
