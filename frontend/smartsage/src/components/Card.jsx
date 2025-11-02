export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}
