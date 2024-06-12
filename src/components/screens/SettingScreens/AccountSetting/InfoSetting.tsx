import { FC } from "react";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import InputComponent from "@/components/ui/input/InputComponent";
import { IInfo } from "@/interface/IInfo";
import { useTranslation } from "react-i18next";

interface IProps {
  info: IInfo;
  setInfo: React.Dispatch<React.SetStateAction<IInfo>>;
  error: Error | null;
}
const InfoSetting: FC<IProps> = ({ info, setInfo, error }) => {
  const { t } = useTranslation();
  return (
    <>
      {" "}
      <div className="flex flex-col gap-y-4">
        <InputComponent
          value={info.firstName}
          setValue={(newValue: string) =>
            setInfo((prevInfo) => ({
              ...prevInfo,
              firstName: newValue.trim(),
            }))
          }
          placeholder={t("account.FirstName")}
          label={t("account.FirstName")}
        />
        <InputComponent
          value={info.lastName}
          setValue={(newValue: string) =>
            setInfo((prevInfo) => ({
              ...prevInfo,
              lastName: newValue.trim(),
            }))
          }
          placeholder={t("account.LastName")}
          label={t("account.LastName")}
        />
        <InputComponent
          value={info.email}
          setValue={(newValue: string) =>
            setInfo((prevInfo) => ({
              ...prevInfo,
              email: newValue.trim(),
            }))
          }
          placeholder="Email"
          label="Email"
        />
        <InputComponent
          value={info.phone}
          setValue={(newValue: string) =>
            setInfo((prevInfo) => ({
              ...prevInfo,
              phone: newValue.trim(),
            }))
          }
          placeholder={t("account.PhoneNumber")}
          label={t("account.PhoneNumber")}
          type="number"
        />
        <div className="max-w-44">
          <ButtonMain value={t("account.SaveChanges")} type="submit" />
        </div>
        {error && <p className=" text-red-600">Error: {error.message}</p>}
      </div>
    </>
  );
};
export default InfoSetting;
