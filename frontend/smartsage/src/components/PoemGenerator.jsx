import { useState } from 'react';
import { Feather, Sparkles, Quote } from 'lucide-react';

export default function PoemGenerator() {
  const [contentType, setContentType] = useState('poem');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [generated, setGenerated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const themes = [
    'Love', 'Friendship', 'Motivation', 'Nature', 
    'Hope', 'Dreams', 'Success', 'Peace'
  ];

  const cleanMarkdown = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/^\s*\*\s+/gm, '• ')
      .replace(/\*/g, '')
      .replace(/\\n/g, '\n')
      .trim();
  };

  const handleGenerate = async () => {
    const theme = customTheme || selectedTheme;
    if (!theme || isLoading) return;

    setIsLoading(true);
    setGenerated(null);

    try {
      const requestBody = {
        topic: theme,
        theme: theme,
        type: contentType  
      };

      console.log('📦 Sending:', JSON.stringify(requestBody));

      const response = await fetch('https://itw-proj-777268942678.europe-west1.run.app/poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('✅ Status:', response.status);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✨ Response:', data);

      let content = '';
      
      if (data.result) {
        content = data.result;
      } else if (typeof data === 'string') {
        content = data;
      } else if (data.poem) {
        content = data.poem;
      } else if (data.quote) {
        content = data.quote;
      } else if (data.content) {
        content = data.content;
      } else if (data.text) {
        content = data.text;
      } else {
        content = JSON.stringify(data);
      }

      setGenerated({
        title: theme,
        content: cleanMarkdown(content),
        type: contentType
      });

    } catch (error) {
      console.error('❌ Error:', error);
      setGenerated({
        title: 'Error',
        content: `Error: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Feather size={28} className="text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Poem & Quote Generator</h2>
              <p className="text-sm text-teal-100">Create beautiful poems and inspiring quotes</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
           
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Choose Your Theme</h3>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Content Type</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setContentType('poem')}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      contentType === 'poem'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Sparkles size={20} className="mx-auto mb-1" />
                    <p className="text-sm font-medium">Poem</p>
                  </button>
                  
                  <button
                    onClick={() => setContentType('quote')}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      contentType === 'quote'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Quote size={20} className="mx-auto mb-1" />
                    <p className="text-sm font-medium">Quote</p>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Select a Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setCustomTheme('');
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTheme === theme
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Or Enter Custom Theme</p>
                <input
                  type="text"
                  value={customTheme}
                  onChange={(e) => {
                    setCustomTheme(e.target.value);
                    setSelectedTheme('');
                  }}
                  placeholder="E.g., Perseverance, Adventure, Family..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={(!selectedTheme && !customTheme) || isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Generate {contentType === 'poem' ? 'Poem' : 'Quote'}</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generated {contentType === 'poem' ? 'Poem' : 'Quote'}</h3>

              <div className="min-h-[400px] p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border border-gray-200 dark:border-gray-700 rounded-xl overflow-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex gap-2 mb-3">
                      <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                      <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                    <p className="text-sm text-gray-500">Creating {contentType}...</p>
                  </div>
                ) : generated ? (
                  contentType === 'poem' ? (
                    <div className="text-center space-y-4">
                      <h4 className="text-xl font-bold text-teal-600 dark:text-teal-400">{generated.title}</h4>
                      <pre className="text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-serif">
                        {generated.content}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 py-8">
                      <Quote size={40} className="mx-auto text-teal-400 opacity-30" />
                      <p className="text-lg italic text-gray-800 dark:text-gray-200 font-serif">
                        {generated.content}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Theme: {generated.title}</p>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Feather size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="text-gray-400">Your {contentType} will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
