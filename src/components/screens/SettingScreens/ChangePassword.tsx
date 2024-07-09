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
import { useTranslation } from "react-i18next";

const ChangePassword: FC = () => {
  const { t } = useTranslation();
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
          setError(t("Errors.failedChangePassword"));
        }
      } else {
        setError(t("Errors.RepeatPassword"));
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError(t("Errors.InvalidCurrentPasswordEntered"));
    }
  }
  return (
    <>
      <section className="border border-gray-scale-gray-100 rounded-lg">
        <div className="border-b border-gray-scale-gray-100 py-4 px-6">
          <h3 className="text-xl">{t("account.ChangePassword")}</h3>
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
              placeholder={t("account.Password")}
              typePassword={true}
              autoComplete="password"
              label={t("account.CurrentPassword")}
            />
            <div className="flex gap-4 flex-col sm:flex-row">
              <InputComponent
                value={password.newPassword}
                setValue={(newValue: string) => {
                  setPassword((prev) => ({
                    ...prev,
                    newPassword: newValue,
                  }));
                }}
                placeholder={t("account.Password")}
                typePassword={true}
                autoComplete="password"
                label={t("account.NewPassword")}
              />
              <InputComponent
                value={password.confirmNewPassword}
                setValue={(newValue: string) => {
                  setPassword((prev) => ({
                    ...prev,
                    confirmNewPassword: newValue,
                  }));
                }}
                placeholder={t("account.Password")}
                typePassword={true}
                autoComplete="password"
                label={t("account.ConfirmPassword")}
              />
            </div>
            <div>
              <ButtonMain
                value={t("account.ChangePassword")}
                type="submit"
                disabled={
                  !currentPassword ||
                  !password.newPassword ||
                  !password.confirmNewPassword
                }
              />
            </div>
          </form>
          {error && (
            <p className=" text-red-600">
              {t("Errors.Error")}: {error}
            </p>
          )}
        </div>
      </section>
      <AlertSuccess
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={t("account.PasswordChanged")}
      />
    </>
  );
};

export default ChangePassword;
