import { useEffect } from "react";
import { ref as databaseRef, onValue } from "firebase/database";
import { database } from "@/firebase";
import useAuth from "@/hooks/useAuth";

const useUserInfo = <T extends object>(
  setInfo: React.Dispatch<React.SetStateAction<T>>
) => {
  const authUser = useAuth();

  useEffect(() => {
    if (authUser) {
      const name = authUser.displayName?.split(" ");
      const firstName = name && name.length > 0 ? name[0] : "";
      const lastName = name && name.length > 1 ? name[1] : "";
      setInfo((prevInfo) => ({
        ...prevInfo,
        firstName: firstName,
        lastName: lastName,
        email: authUser.email || "",
      }));

      // Чтение данных из базы данных
      const userRef = databaseRef(database, "usersInfo/" + authUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setInfo((prevInfo) => ({
            ...prevInfo,
            phone: data.user?.phoneNumber || "",
          }));
        }
      });
    }
  }, [authUser, setInfo]);
};

export default useUserInfo;
