import AlertSuccess from "@/components/AlertSuccess/AlertSuccess";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import InputComponent from "@/components/ui/input/InputComponent";
import { FC, useEffect, useState } from "react";
import { set, ref as databaseRef, onValue } from "firebase/database";
import useAuth from "@/hooks/useAuth";
import { database } from "@/firebase";

const BillingAddress: FC = () => {
  const authUser = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (authUser) {
      // Чтение данных из базы данных
      const userRef = databaseRef(database, "usersAddress/" + authUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAddress(data.userAddress || "");
        }
      });
    }
  }, [authUser]);

  async function handlerAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!authUser) return;
    try {
      await set(databaseRef(database, "usersAddress/" + authUser.uid), {
        userAddress: address,
      });

      setShowAlert(true);
    } catch (error) {
      console.log(error);
      setError("failed to update address");
    }
  }
  return (
    <>
      <section className="border border-gray-scale-gray-100 rounded-lg">
        <div className="border-b border-gray-scale-gray-100 py-4 px-6">
          <h3 className="text-xl">Billing Address</h3>
        </div>
        <div className="py-4 px-6">
          <form
            action=""
            className="flex flex-col gap-y-5"
            onSubmit={handlerAddress}
          >
            <InputComponent
              value={address}
              setValue={setAddress}
              placeholder="Address"
              autoComplete="address"
              label="City and address"
            />

            <div className="max-w-44">
              <ButtonMain
                value="Change Password "
                type="submit"
                disabled={!address}
              />
            </div>
          </form>
          {error && <p className=" text-red-600">Error: {error}</p>}
        </div>
      </section>
      <AlertSuccess
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message="Address updated"
      />
    </>
  );
};

export default BillingAddress;
