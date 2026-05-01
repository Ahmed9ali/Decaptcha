import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, query, orderByChild, equalTo, get, onValue } from "firebase/database";
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
      // Use catch here so unhandled promises don't break the loading state
      subscribeToUser(storedUid).catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const subscribeToUser = (uid: string) => {
    return new Promise<void>((resolve, reject) => {
      const userRef = ref(db, `users/${uid}`);
      
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUser({ uid, ...data });
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error("User profile not found. Please register on the Android app first."));
        }
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
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Firebase connection timed out. Please check your internet.")), 15000);
      });

      const webAuthRef = ref(db, "web_auth");
      const q = query(webAuthRef, orderByChild("otp"), equalTo(otp));
      const snapshot = await Promise.race([get(q), timeoutPromise]) as any;

      if (snapshot.exists()) {
        let matchedUid = null;
        let valid = false;
        
        snapshot.forEach((childSnapshot: any) => {
          const data = childSnapshot.val();
          
          // THE CLOCK SKEW FIX: 
          // We subtract 10 minutes (600,000 ms) from the phone's current time.
          // This ensures the OTP still works even if the phone's clock is running fast!
          const phoneTimeWithBuffer = Date.now() - (10 * 60 * 1000);

          if (data.expires_at > phoneTimeWithBuffer) {
            matchedUid = childSnapshot.key;
            valid = true;
          }
        });

        if (valid && matchedUid) {
          localStorage.setItem("decaptcha_uid", matchedUid);
          await subscribeToUser(matchedUid);
          return;
        } else {
          throw new Error("OTP expired. Please request a new one from the app.");
        }
      } else {
        throw new Error("Invalid access key.");
      }
    } catch (err: any) {
      // We are leaving the alert here for now just in case. 
      // Once you confirm it works perfectly, you can delete this alert line!
      alert("ERROR: " + (err.message || err.toString()));
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
