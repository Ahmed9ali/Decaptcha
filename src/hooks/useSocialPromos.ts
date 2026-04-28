import { useState, useEffect } from "react";

export interface PromosTask {
  id: string;
  title: string;
  description: string;
  url: string;
  secretCode: string;
  rewardPoints: number;
  type: "youtube" | "facebook" | "telegram" | "other";
  icon?: string;
}

const DEFAULT_PROMOS: PromosTask[] = [
  {
    id: "1",
    title: "Watch our Latest YouTube Video",
    description:
      "Find the secret code hidden in the first 2 minutes of the video!",
    url: "https://youtube.com",
    secretCode: "TUBE-2026",
    rewardPoints: 50,
    type: "youtube",
  },
  {
    id: "2",
    title: "Follow our Facebook Page",
    description: "Check our latest pinned post for the code.",
    url: "https://facebook.com",
    secretCode: "FB-FANS",
    rewardPoints: 30,
    type: "facebook",
  },
  {
    id: "3",
    title: "Join our Telegram Group",
    description: "The admin will share the secret code daily.",
    url: "https://telegram.org",
    secretCode: "TELE-WIN",
    rewardPoints: 40,
    type: "telegram",
  },
];

export function useSocialPromos() {
  const [tasks, setTasks] = useState<PromosTask[]>(() => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("social_promos");
      if (stored) return JSON.parse(stored);
    }
    return DEFAULT_PROMOS;
  });

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("social_promos_completed");
      if (stored) return JSON.parse(stored);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("social_promos", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "social_promos_completed",
      JSON.stringify(completedTaskIds),
    );
  }, [completedTaskIds]);

  const addTask = (task: Omit<PromosTask, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const markTaskCompleted = (id: string) => {
    if (!completedTaskIds.includes(id)) {
      setCompletedTaskIds([...completedTaskIds, id]);
    }
  };

  const verifyTask = (id: string, code: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return { success: false, message: "Task not found" };
    if (task.secretCode.toLowerCase() === code.toLowerCase()) {
      markTaskCompleted(id);
      return { success: true, reward: task.rewardPoints };
    }
    return { success: false, message: "Invalid code. Try again." };
  };

  return { tasks, completedTaskIds, addTask, removeTask, verifyTask };
}
