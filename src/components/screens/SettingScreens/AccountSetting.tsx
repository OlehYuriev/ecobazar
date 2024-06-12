import { FC, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { updateEmail, updateProfile } from "firebase/auth";
import { IInfo } from "@/interface/IInfo";
import { database } from "@/firebase";
import styles from "./SettingScreens.module.scss";
import { set, ref as databaseRef } from "firebase/database";
import PhotoSetting from "./AccountSetting/PhotoSetting";
import InfoSetting from "./AccountSetting/InfoSetting";
import { deletePhoto, uploadAndRefreshProfile } from "@/services/uploadPhoto";
import AlertSuccess from "@/components/AlertSuccess/AlertSuccess";
import useUserInfo from "@/hooks/useUserInfo";
import { useTranslation } from "react-i18next";

const AccountSetting: FC = () => {
  const { t } = useTranslation();
  const authUser = useAuth();
  const [info, setInfo] = useState<IInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useUserInfo<IInfo>(setInfo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authUser) return;

    const { firstName, lastName, email, phone } = info;

    try {
      // Обновление профиля, обновление email и установка информации пользователя в базу данных выполняются параллельно
      await Promise.all([
        updateProfile(authUser, { displayName: `${firstName} ${lastName}` }),
        updateEmail(authUser, email),
        set(databaseRef(database, "usersInfo/" + authUser.uid), {
          user: { phoneNumber: phone },
        }),
        Promise.resolve(handleUpload()),
      ]);
      setShowAlert(true);
      // Если все операции выполнены успешно, можно перейти к загрузке изображения
    } catch (error) {
      console.error("Error updating profile: ", error);
      const typedError =
        error instanceof Error ? error : new Error(String(error));
      setError(typedError);
    }
  };

  const handleUpload = async () => {
    if (!file || !authUser) return;
    setUploading(true);
    setError(null);
    try {
      await deletePhoto(authUser);
      await uploadAndRefreshProfile(
        authUser,
        file,
        setProgress,
        setError,
        setUploading
      );
    } catch (error) {
      const typedError =
        error instanceof Error ? error : new Error(String(error));
      setError(typedError);
      setUploading(false);
      return;
    }
  };
  return (
    <>
      <section className="border border-gray-scale-gray-100 rounded-lg">
        <div className="border-b border-gray-scale-gray-100 py-4 px-6">
          <h3 className="text-xl">{t("account.AccountSettings")}</h3>
        </div>
        <div className="py-4 px-6">
          <form action="" className={styles.form} onSubmit={handleSubmit}>
            <InfoSetting info={info} setInfo={setInfo} error={error} />
            <PhotoSetting
              setFile={setFile}
              uploading={uploading}
              progress={progress}
              authUser={authUser}
            />
          </form>
        </div>
      </section>
      <AlertSuccess
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={t("account.ProfileUpdatedSuccessfully")}
      />
    </>
  );
};

export default AccountSetting;
