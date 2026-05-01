import { callEdgeFunction } from "./supabase";
import { db } from "./firebase";
import { ref, update, get, query, orderByChild, limitToLast } from "firebase/database";

export const ApiService = {
  // --- Text Captcha ---
  async generateTextCaptcha(userId: string) {
    // Falls back to local generation if backend fails or doesn't return text
    return await callEdgeFunction("text-handler", {
      action: "generate",
      user_id: userId,
    });
  },

  async validateTextCaptcha(userId: string, puzzleId: string, userInput: string) {
    return await callEdgeFunction("text-handler", {
      action: "validate_text_captcha",
      user_id: userId,
      puzzle_id: puzzleId,
      user_input: userInput,
    });
  },

  async skipTextCaptcha(userId: string, puzzleId: string) {
    return await callEdgeFunction("text-handler", {
      action: "skip_text_captcha",
      user_id: userId,
      puzzle_id: puzzleId,
    });
  },

  // --- Wallet / Withdrawal ---
  async withdraw(userId: string, amount: number, method: string, coin: string, details: string) {
    return await callEdgeFunction("wallet-handler", {
      action: "withdraw",
      user_id: userId,
      amount,
      method,
      coin,
      details,
    });
  },

  // --- Daily Check-in (Firebase Direct) ---
  async dailyCheckin(userId: string, currentStreak: number) {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) throw new Error("User not found");
    const userData = snapshot.val();
    
    // Simplistic streak logic to update firebase directly
    const pointsToAdd = 10; // Can be based on app_config
    
    await update(userRef, {
      "dailyCheckin/lastCheckinTimestamp": Date.now(),
      "dailyCheckin/currentStreak": currentStreak + 1,
      "points": (userData.points || 0) + pointsToAdd,
    });
    
    return { pointsAdded: pointsToAdd };
  },

  // --- Leaderboard ---
  async getTopUsers(limit: number = 20) {
    const usersRef = ref(db, "users");
    const topUsersQuery = query(usersRef, orderByChild("points"), limitToLast(limit));
    const snapshot = await get(topUsersQuery);
    
    const users: any[] = [];
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        users.push({ id: child.key, ...child.val() });
      });
    }
    
    // Sort descending
    return users.sort((a, b) => (b.points || 0) - (a.points || 0));
  }
};
