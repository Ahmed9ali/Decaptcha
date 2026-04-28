import { useState, useEffect } from 'react';

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqs: Faq[] = [
  { id: '1', question: 'When will I get paid?', answer: 'Withdrawals are processed within 24 hours. Crypto withdrawals are usually instant.' },
  { id: '2', question: 'Why am I not getting captchas?', answer: 'Ensure your accuracy is above 90% and you are not using a VPN.' }
];

export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>(defaultFaqs);

  useEffect(() => {
    const saved = localStorage.getItem('decaptcha_faqs');
    if (saved) {
      try {
        setFaqs(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved faqs", e);
      }
    }
  }, []);

  const addFaq = (faq: Omit<Faq, 'id'>) => {
    const newFaq = { ...faq, id: Date.now().toString() };
    const newFaqs = [...faqs, newFaq];
    setFaqs(newFaqs);
    localStorage.setItem('decaptcha_faqs', JSON.stringify(newFaqs));
  };

  const updateFaq = (updatedFaq: Faq) => {
    const newFaqs = faqs.map(f => f.id === updatedFaq.id ? updatedFaq : f);
    setFaqs(newFaqs);
    localStorage.setItem('decaptcha_faqs', JSON.stringify(newFaqs));
  };
  
  const deleteFaq = (id: string) => {
    const newFaqs = faqs.filter(f => f.id !== id);
    setFaqs(newFaqs);
    localStorage.setItem('decaptcha_faqs', JSON.stringify(newFaqs));
  };

  return { faqs, addFaq, updateFaq, deleteFaq };
}
