import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, query, orderByChild, equalTo, get, onValue, set } from "firebase/database";
import { db } from "./firebase"; 

interface UserProfile {
  uid: string;
  balance: number;
  points: number;
  email: string;
  username: string;
  captchaStats?: { text?: { dailyCount: number; lastSolvedDate: string }; };
  dailyCheckin?: { currentStreak: number; lastCheckinTimestamp: number; };
  security_stats?: { status: string; is_modded: boolean; is_vpn: boolean; };
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithOtp: (otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null, loading: true, loginWithOtp: async () => {}, logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUid = localStorage.getItem("decaptcha_uid");
    if (storedUid) { subscribeToUser(storedUid); } 
    else { setLoading(false); }
  }, []);

  const subscribeToUser = (uid: string) => {
    return new Promise<void>((resolve, reject) => {
      const userRef = ref(db, `users/${uid}`);
      onValue(userRef, async (snapshot) => {
        if (snapshot.exists()) {
          setUser({ uid, ...snapshot.val() });
        } else {
          const newUser = {
            balance: 0, points: 0, email: "user@decaptcha.app",
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
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Firebase connection timed out.")), 15000);
      });

      const webAuthRef = ref(db, "web_auth");
      const q = query(webAuthRef, orderByChild("otp"), equalTo(otp));
      const snapshot = await Promise.race([get(q), timeoutPromise]) as any;

      if (snapshot.exists()) {
        let matchedUid = null;
        let valid = false;
        
        snapshot.forEach((childSnapshot: any) => {
          const data = childSnapshot.val();
          if (data.expires_at > Date.now()) {
            matchedUid = childSnapshot.key;
            valid = true;
          }
        });

        if (valid && matchedUid) {
          localStorage.setItem("decaptcha_uid", matchedUid);
          await subscribeToUser(matchedUid);
          return;
        } else {
          throw new Error("OTP expired.");
        }
      } else {
        throw new Error("Invalid access key.");
      }
    } catch (err: any) {
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
