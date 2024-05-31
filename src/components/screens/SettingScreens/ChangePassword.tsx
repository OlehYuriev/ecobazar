import AlertSuccess from "@/components/AlertSuccess/AlertSuccess";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import InputComponent from "@/components/ui/input/InputComponent";
import { auth } from "@/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { FC, useState } from "react";

const ChangePassword: FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState<string>("");
  async function handlerPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // Получаем текущего пользователя
      const user = auth.currentUser;
      if (password.newPassword === password.confirmNewPassword) {
        if (user && user.email) {
          const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
          );

          // Повторная аутентификация
          await reauthenticateWithCredential(user, credential);

          // Обновление пароля
          await updatePassword(user, password.newPassword);

          setShowAlert(true);
          setError("");
        } else {
          setError("Invalid current password entered");
          setError("failed to change password");
        }
      } else {
        setError("Repeat password");
      }
    } catch (error) {
      console.error("Error updating password:", error);

      setError("Invalid current password entered");
    }
  }
  return (
    <>
      <section className="border border-gray-scale-gray-100 rounded-lg">
        <div className="border-b border-gray-scale-gray-100 py-4 px-6">
          <h3 className="text-xl">Account Settings</h3>
        </div>
        <div className="py-4 px-6">
          <form
            action=""
            className="flex flex-col gap-y-5"
            onSubmit={handlerPassword}
          >
            <InputComponent
              value={currentPassword}
              setValue={setCurrentPassword}
              placeholder="Password"
              typePassword={true}
              autoComplete="password"
              label="Current Password"
            />
            <div className="flex gap-x-4">
              <InputComponent
                value={password.newPassword}
                setValue={(newValue: string) => {
                  setPassword((prev) => ({
                    ...prev,
                    newPassword: newValue,
                  }));
                }}
                placeholder="Password"
                typePassword={true}
                autoComplete="password"
                label="New Password Password"
              />
              <InputComponent
                value={password.confirmNewPassword}
                setValue={(newValue: string) => {
                  setPassword((prev) => ({
                    ...prev,
                    confirmNewPassword: newValue,
                  }));
                }}
                placeholder="Password"
                typePassword={true}
                autoComplete="password"
                label="Confirm Password"
              />
            </div>
            <div className="max-w-44">
              <ButtonMain
                value="Change Password "
                type="submit"
                disabled={
                  !currentPassword ||
                  !password.newPassword ||
                  !password.confirmNewPassword
                }
              />
            </div>
          </form>
          {error && <p className=" text-red-600">Error: {error}</p>}
        </div>
      </section>
      <AlertSuccess
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message="Password changed"
      />
    </>
  );
};

export default ChangePassword;
