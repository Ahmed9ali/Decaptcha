import { Mail, Send, HelpCircle, MessageSquare, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useFaqs } from '../lib/useFaqs';
import { useMessages } from '../hooks/useMessages';

export default function Contact() {
  const { faqs } = useFaqs();
  const { sendMessage } = useMessages();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'' | 'sending' | 'sent'>('');

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    setTimeout(() => {
      sendMessage(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="text-center relative py-12 glass-panel border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-sm bg-gradient-to-b from-blue-50 to-white dark:from-[#0b1121]/80 dark:to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        <Phone className="w-16 h-16 text-blue-500 mx-auto mb-6 relative z-10" />
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4 relative z-10">
          Get in <span className="text-blue-500">Touch</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-4 relative z-10 leading-relaxed font-medium">
          Have a question or need assistance? We're here to help. Send us a message or browse our FAQs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Form & Channels */}
        <div className="lg:col-span-3 space-y-6">
          {/* Contact Form */}
          <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-500">
                <Send className="w-5 h-5" />
              </div>
              Send a Message
            </h3>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none shadow-sm" 
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.3)] transition-all flex justify-center items-center gap-2"
              >
                {status === 'sending' ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : status === 'sent' ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-slate-200 dark:border-white/10 shadow-sm text-center sm:text-left transition-transform hover:-translate-y-1">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-500 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-1">Telegram Support</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Join our community for instant help.</p>
              </div>
            </div>
            
            <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-slate-200 dark:border-white/10 shadow-sm text-center sm:text-left transition-transform hover:-translate-y-1">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-1">Email Support</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px]" title="support@decaptcha.app">support@decaptcha.app</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ */}
        <div className="lg:col-span-2">
          <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl text-emerald-500">
                <HelpCircle className="w-5 h-5" />
              </div>
              FAQs
            </h3>
            
            <div className="space-y-3">
              {faqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${expandedFaq === faq.id ? 'bg-slate-50 dark:bg-white/5' : 'bg-white/50 dark:bg-black/20 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  <button 
                    className="w-full text-left px-5 py-4 font-bold text-sm text-slate-800 dark:text-white flex justify-between items-center gap-4"
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 mx-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
              
              {faqs.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm py-4">No FAQs available yet.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
