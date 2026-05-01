import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, query, orderByChild, equalTo, get, onValue, set } from "firebase/database";
import { db } from "./firebase"; 

interface UserProfile {
  uid: string;
  balance: number;
  points: number;
  email: string;
  username: string;
  captchaStats?: {
    text?: { dailyCount: number; lastSolvedDate: string };
  };
  dailyCheckin?: {
    currentStreak: number;
    lastCheckinTimestamp: number;
  };
  security_stats?: {
    status: string;
    is_modded: boolean;
    is_vpn: boolean;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithOtp: (otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithOtp: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUid = localStorage.getItem("decaptcha_uid");
    if (storedUid) {
      subscribeToUser(storedUid);
    } else {
      setLoading(false);
    }
  }, []);

  const subscribeToUser = (uid: string) => {
    return new Promise<void>((resolve, reject) => {
      const userRef = ref(db, `users/${uid}`);
      onValue(userRef, async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUser({ uid, ...data });
        } else {
          const newUser = {
            balance: 0,
            points: 0,
            email: "user@decaptcha.app",
            username: `User${uid.substring(0, 4)}`,
            security_stats: { status: "active", is_modded: false, is_vpn: false }
          };
          await set(userRef, newUser);
          setUser({ uid, ...newUser });
        }
        setLoading(false);
        resolve();
      }, (error) => {
        console.error("Firebase subscription error:", error);
        setUser(null);
        localStorage.removeItem("decaptcha_uid");
        setLoading(false);
        reject(error);
      });
    });
  };

  const loginWithOtp = async (otp: string) => {
    const loginWithOtp = async (otp: string) => {
    try {
      // 1. Check if Vite actually loaded the env variables!
      const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;
      if (!dbUrl) {
        throw new Error("CRITICAL: Database URL is empty! Vite did not load your .env file correctly.");
      }

      // 2. Format the URL for a raw REST API fetch (bypassing the Firebase SDK)
      const cleanDbUrl = dbUrl.replace(/\/$/, '');
      const fetchUrl = `${cleanDbUrl}/web_auth.json?orderBy="otp"&equalTo="${otp}"`;

      // 3. Set a 10-second timeout for the fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // 4. Make the raw HTTP request
      const response = await fetch(fetchUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Firebase API rejected the request: HTTP ${response.status}`);
      }

      const data = await response.json();

      // 5. Check if we found a matching OTP
      if (data && Object.keys(data).length > 0) {
        const matchedUid = Object.keys(data)[0];
        const authData = data[matchedUid];

        if (authData.expires_at > Date.now()) {
          localStorage.setItem("decaptcha_uid", matchedUid);
          await subscribeToUser(matchedUid); 
          return;
        } else {
          throw new Error("OTP expired. Please request a new one.");
        }
      } else {
        throw new Error("Invalid access key.");
      }

    } catch (err: any) {
      // Notice the popup now says "REST FETCH ERROR" so we know this new code is running!
      alert("REST FETCH ERROR: " + (err.message || err.toString()));
      console.error("RAW FETCH ERROR:", err);
      throw new Error(err.message || "Failed to log in.");
    }
  };


  const logout = () => {
    localStorage.removeItem("decaptcha_uid");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
