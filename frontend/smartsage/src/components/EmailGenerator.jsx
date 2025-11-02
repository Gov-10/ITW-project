import { useState } from 'react';
import { Mail, Wand2, Copy, Check } from 'lucide-react';

export default function EmailGenerator() {
  const [prompt, setPrompt] = useState('');
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const parseEmailResponse = (data) => {
    try {
      let emailData = data;
      if (typeof data === 'string') {
        emailData = JSON.parse(data);
      }
      const res = JSON.parse(emailData.result.replaceAll("```", "").replace("json", ""))
      console.log({ res })
      let subject = res.subject || emailData.subject_line || '';
      let body = res.body || emailData.email_body || emailData.email || '';

      subject = subject
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*/g, '')
        .trim();

      body = body
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\\n/g, '\n')
        .replace(/\n\n+/g, '\n\n')
        .trim();

      return { subject, body };
    } catch (e) {
      return {
        subject: 'Professional Email',
        body: data
      };
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setEmail(null);

    try {
      console.log('🚀 Sending request to Email API...');
      console.log('📝 Prompt:', prompt);

      const response = await fetch('https://itw-proj-777268942678.europe-west1.run.app/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          topic: prompt
        })
      });

      console.log('✅ Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await (response.json());
      console.log('✨ Raw API Response:', data);

      const parsedEmail = parseEmailResponse(data);
      console.log('📧 Parsed Email:', parsedEmail);

      setEmail(parsedEmail);
    } catch (error) {
      console.error('❌ Error:', error);

      setEmail({
        subject: 'Error',
        body: `Sorry, I encountered an error: ${error.message}\n\nPlease try again or check your internet connection.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!email) return;
    const fullEmail = `Subject: ${email.subject}\n\n${email.body}`;
    await navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Mail size={28} className="text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Email Writer</h2>
              <p className="text-sm text-teal-100">Generate professional emails instantly</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
          
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Enter Your Prompt</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">What kind of email do you need?</p>

                <form onSubmit={handleGenerate} className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Write a follow-up email to my professor about project deadline extension..."
                    className="w-full h-40 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none transition-all"
                    disabled={isLoading}
                  />

                  <button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 size={18} />
                    <span>Generate Email</span>
                  </button>
                </form>
              </div>
            </div>

            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generated Email</h3>
                {email && (
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>

              <div className="h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-auto font-mono text-sm">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex gap-2 mb-3">
                      <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                    <p className="text-sm text-gray-500">Generating email...</p>
                  </div>
                ) : email ? (
                  <div className="space-y-2 text-gray-800 dark:text-gray-200">
                    <div>
                      <span className="font-bold">Subject:</span> {email.subject}
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2 mb-2"></div>
                    <div className="whitespace-pre-wrap leading-relaxed font-sans">
                      {email.body}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <p className="text-gray-400">Your generated email will appear here</p>
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
