import { useState, useEffect } from "react";
import { useTrustScore } from "./useTrustScore";
import { useWallet } from "./useWallet";

export interface XPConfig {
  textCaptcha: number;
  dailyLogin: number;
  streak: number;
  promo: number;
}

export interface RewardsConfig {
  rank1: string;
  rank2: string;
  rank3: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  trustScore: number;
  avatarSeed: string;
  isCurrentUser?: boolean;
}

export interface LeaderboardHistoryEntry {
  weekId: string;
  top3: { name: string; avatarSeed: string; reward: string }[];
}

const DEFAULT_XP_CONFIG: XPConfig = {
  textCaptcha: 4,
  dailyLogin: 10,
  streak: 15,
  promo: 25,
};

const DEFAULT_REWARDS: RewardsConfig = {
  rank1: "$50.00",
  rank2: "$25.00",
  rank3: "$10.00",
};

const MOCK_USERS: LeaderboardUser[] = [
  { id: "u2", name: "Sarah M.", xp: 12500, trustScore: 95, avatarSeed: "Sarah" },
  { id: "u3", name: "John D.", xp: 11200, trustScore: 100, avatarSeed: "John" },
  { id: "u4", name: "Mike R.", xp: 9800, trustScore: 88, avatarSeed: "Mike" },
  { id: "u5", name: "Emma T.", xp: 9100, trustScore: 92, avatarSeed: "Emma" },
  { id: "u6", name: "Chris P.", xp: 8400, trustScore: 80, avatarSeed: "Chris" },
  { id: "u7", name: "Lisa K.", xp: 7500, trustScore: 100, avatarSeed: "Lisa" },
  { id: "u8", name: "Tom W.", xp: 6000, trustScore: 75, avatarSeed: "Tom" },
];

export function useLeaderboard() {
  const { trustState } = useTrustScore();
  const [xpConfig, setXpConfig] = useState<XPConfig>(() => {
    const saved = localStorage.getItem("decaptcha_xp_config");
    return saved ? JSON.parse(saved) : DEFAULT_XP_CONFIG;
  });

  const [rewardsConfig, setRewardsConfig] = useState<RewardsConfig>(() => {
    const saved = localStorage.getItem("decaptcha_rewards_config");
    return saved ? JSON.parse(saved) : DEFAULT_REWARDS;
  });

  const [userXp, setUserXp] = useState<number>(() => {
    const saved = localStorage.getItem("decaptcha_user_xp");
    return saved ? parseInt(saved) : 0;
  });

  const [history, setHistory] = useState<LeaderboardHistoryEntry[]>(() => {
    const saved = localStorage.getItem("decaptcha_leaderboard_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastReset, setLastReset] = useState<number>(() => {
    const saved = localStorage.getItem("decaptcha_last_reset");
    return saved ? parseInt(saved) : Date.now();
  });

  useEffect(() => {
    localStorage.setItem("decaptcha_xp_config", JSON.stringify(xpConfig));
    localStorage.setItem("decaptcha_rewards_config", JSON.stringify(rewardsConfig));
    localStorage.setItem("decaptcha_user_xp", userXp.toString());
    localStorage.setItem("decaptcha_leaderboard_history", JSON.stringify(history));
    localStorage.setItem("decaptcha_last_reset", lastReset.toString());
  }, [xpConfig, rewardsConfig, userXp, history, lastReset]);

  const addXp = (amount: number) => {
    setUserXp((prev) => prev + amount);
  };

  const forceReset = () => {
    const sortedMock = [...MOCK_USERS].sort(
      (a, b) => (b.xp * (b.trustScore / 100)) - (a.xp * (a.trustScore / 100))
    );
    const currentUserScore = userXp * (trustState.score / 100);
    
    // Find top 3 (including current user if they qualify)
    let combined = [...sortedMock, {
      id: "u1", name: "You", xp: userXp, trustScore: trustState.score, avatarSeed: "Alex", isCurrentUser: true
    }];
    combined.sort((a, b) => (b.xp * (b.trustScore / 100)) - (a.xp * (a.trustScore / 100)));
    
    const top3 = combined.slice(0, 3).map((u, i) => ({
      name: u.name,
      avatarSeed: u.avatarSeed,
      reward: i === 0 ? rewardsConfig.rank1 : i === 1 ? rewardsConfig.rank2 : rewardsConfig.rank3
    }));

    setHistory((prev) => [
      { weekId: `Week of ${new Date().toLocaleDateString()}`, top3 },
      ...prev
    ]);
    
    setUserXp(0);
    setLastReset(Date.now());
  };

  // Build live leaderboard
  const getLiveLeaderboard = () => {
    const currentUser: LeaderboardUser = {
      id: "u0",
      name: "You",
      xp: userXp,
      trustScore: trustState.score,
      avatarSeed: "Alex",
      isCurrentUser: true,
    };

    const combined = [...MOCK_USERS, currentUser];
    combined.sort((a, b) => {
      const scoreA = a.xp * (a.trustScore / 100);
      const scoreB = b.xp * (b.trustScore / 100);
      return scoreB - scoreA;
    });

    return combined.map((user, index) => ({
      ...user,
      rank: index + 1,
      finalScore: Math.floor(user.xp * (user.trustScore / 100)),
      reward: index === 0 ? rewardsConfig.rank1 : index === 1 ? rewardsConfig.rank2 : index === 2 ? rewardsConfig.rank3 : null
    }));
  };

  return {
    xpConfig,
    setXpConfig,
    rewardsConfig,
    setRewardsConfig,
    userXp,
    addXp,
    history,
    forceReset,
    lastReset,
    getLiveLeaderboard
  };
}
