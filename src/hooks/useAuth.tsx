import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
};

export default useAuth;
