import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, query, orderByChild, equalTo, get, onValue, set } from "firebase/database";
import { db } from "./firebase"; // Make sure this path points to the file above

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
          // If user node doesn't exist, create it so they can log in
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
    try {
      // 10 second timeout for Firebase RTDB connection
      const timeoutPromise = new Promise((_, reject) => {
        const errorMsg = "Could not connect to Firebase database. Check that VITE_FIREBASE_API_KEY and VITE_FIREBASE_DATABASE_URL are correct in your App Secrets.";
        setTimeout(() => reject(new Error(errorMsg)), 10000);
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
          throw new Error("OTP expired");
        }
      } else {
        throw new Error("Invalid access key");
      }
    } catch (err: any) {
      throw err;
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
