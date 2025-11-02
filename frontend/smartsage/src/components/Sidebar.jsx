import { BookOpen, Mail, Feather, X, Sparkles, ChevronLeft, Menu } from 'lucide-react';

export default function Sidebar({ activeModule, onModuleChange, isOpen, onClose, isCollapsed, setIsCollapsed }) {
  const modules = [
    { id: 'study', name: 'Study Assistant', icon: BookOpen, desc: 'Ask academic questions and get instant explanations' },
    { id: 'email', name: 'Email Writer', icon: Mail, desc: 'Generate professional emails instantly' },
    { id: 'poem', name: 'Poem Generator', icon: Feather, desc: 'Create beautiful poems and inspiring quotes' }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`fixed top-16 left-0 bottom-0 z-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full p-4">
          <button
            onClick={onClose}
            className="lg:hidden self-end p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mb-4 transition-colors"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          {/* Version badge with collapse button */}
          <div className="mb-6 relative">
            {!isCollapsed ? (
              <div className="flex items-center justify-between gap-2 px-3 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                  <span className="text-xs font-medium text-teal-700 dark:text-teal-300">v1.0.0</span>
                </div>
                <button
                  onClick={toggleCollapse}
                  className="hidden lg:block p-1 hover:bg-teal-100 dark:hover:bg-teal-800 rounded transition-colors"
                  title="Collapse sidebar"
                >
                  <ChevronLeft size={16} className="text-teal-600 dark:text-teal-400" />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleCollapse}
                className="hidden lg:flex w-full justify-center p-2 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
                title="Expand sidebar"
              >
                <Menu size={20} className="text-teal-600 dark:text-teal-400" />
              </button>
            )}
          </div>

          <nav className="space-y-2 flex-1 overflow-y-auto">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    onModuleChange(module.id);
                    onClose();
                  }}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } ${isCollapsed ? 'lg:justify-center lg:p-3' : ''}`}
                  title={isCollapsed ? module.name : ''}
                >
                  <Icon size={20} className="flex-shrink-0 mt-0.5" />
                  
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">{module.name}</p>
                      <p className={`text-xs mt-0.5 ${
                        isActive ? 'text-teal-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {module.desc}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
