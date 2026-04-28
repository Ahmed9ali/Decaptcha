import { useState, useEffect } from 'react';

interface Policies {
  terms: string;
  privacy: string;
}

const defaultPolicies: Policies = {
  terms: `## 1. Acceptance of Terms\nBy accessing and using DeCaptcha ("the App", "we", "us", or "our"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our Application.\n\n## 2. User Responsibilities\n- You must be at least 18 years old or the legal age of majority in your jurisdiction.\n- You are responsible for maintaining the confidentiality of your Access Key.\n- You agree to solve captchas manually and accurately.\n- You will not use automated scripts, macro recorders, clickers, or any AI tools to solve captchas.\n- You will not use VPNs, proxies, or Tor to mask your location.\n\n## 3. Fair Usage Policy & Accuracy\nWe require users to maintain a minimum accuracy rate of 90%. Dropping below this threshold may result in reduced earnings, account throttling, or a temporary ban. Intentional submission of incorrect data is considered fraud.\n\n## 4. Fraud & Account Bans\nAny detection of bots, multiple accounts by the same user to bypass limits, or tampering with the Application's code will result in an immediate and permanent account ban. All accumulated points and balances associated with banned accounts are immediately forfeited and will not be paid out under any circumstances.\n\n## 5. Rewards & Withdrawals\nRewards are subject to change based on market rates and advertiser demand. Withdrawals are subject to verification. We reserve the right to delay or cancel any withdrawal request if suspicious activity is detected. Standard withdrawal processing time is 24 hours, but manual reviews may take up to 14 days.\n\n## 6. Limitation of Liability\nDeCaptcha is provided "as is" without any warranties. We are not liable for any lost earnings due to technical glitches, server downtime, or rate changes.`,
  privacy: `We don't store passwords.\nDeCaptcha relies on a unique Access Key system. We do not require your email, name, or password to start earning. Your anonymity is maintained as long as you do not request fiat (bank/UPI) withdrawals.\n\n## Information We Collect\nWe collect the minimum amount of information necessary to run our service safely:\n- **Device & IP Information:** For fraud prevention and blocking bots.\n- **Solving Analytics:** Your accuracy, speed, and patterns to maintain quality control.\n- **Withdrawal Data:** Payment addresses, UPI IDs, or account handles strictly for processing payouts.\n\n## Cookies & Local Storage\nWe use Local Storage and essential cookies to maintain your session (keeping you logged in via your Access Key) and to save your UI preferences (like dark mode or navigation state). We do not use third-party tracking cookies for advertising.\n\n## Data Sharing\nWe do not sell your personal data to third parties. Data (such as the captcha solution itself and your trust score) is shared anonymously with our captcha-requesting clients. Payout information is shared securely with our payment processors (e.g., Binance, PayPal) solely to execute your withdrawals.\n\n## Data Deletion\nYou can request account deletion at any time by contacting support. Note that deleting your account will permanently destroy your Access Key and any unwithdrawn balances. Due to fraud prevention laws, we may retain basic transaction history for up to 12 months.`
};

export function usePolicies() {
  const [policies, setPolicies] = useState<Policies>(defaultPolicies);

  useEffect(() => {
    const saved = localStorage.getItem('decaptcha_policies');
    if (saved) {
      try {
        setPolicies(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved policies", e);
      }
    }
  }, []);

  const updatePolicies = (newPolicies: Policies) => {
    setPolicies(newPolicies);
    localStorage.setItem('decaptcha_policies', JSON.stringify(newPolicies));
  };

  return { policies, updatePolicies };
}
