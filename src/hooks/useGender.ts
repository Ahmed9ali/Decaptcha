import { useState, useEffect } from "react";

export function useGender() {
  const [gender, setGender] = useState<string>(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("user_gender") || "male";
    }
    return "male";
  });

  const getAvatarUrl = () => {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${gender === "female" ? "Valentina" : "Alexander"}&backgroundColor=transparent`;
  };

  const updateGender = (newGender: string) => {
    setGender(newGender);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_gender", newGender);
      window.dispatchEvent(new Event("genderChange"));
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof localStorage !== "undefined") {
        setGender(localStorage.getItem("user_gender") || "male");
      }
    };
    window.addEventListener("genderChange", handleStorageChange);
    return () =>
      window.removeEventListener("genderChange", handleStorageChange);
  }, []);

  return { gender, updateGender, getAvatarUrl };
}
