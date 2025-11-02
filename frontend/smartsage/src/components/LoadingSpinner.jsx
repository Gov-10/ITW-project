export default function LoadingSpinner({ message = 'Thinking...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
      {message && (
        <div className="flex items-center gap-1 text-slate-400">
          <span className="font-medium">{message}</span>
          <div className="flex gap-1">
            <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      )}
    </div>
  );
}
