import { FC } from "react";
import InputComponent from "@/components/ui/input/InputComponent";
import TextareaComponent from "@/components/ui/textarea/TextareaComponent";
import { IInfoSend } from "@/interface/IInfo";
import { useTranslation } from "react-i18next";

interface IProps {
  info: IInfoSend;
  setInfo: React.Dispatch<React.SetStateAction<IInfoSend>>;
}
const CheckoutForm: FC<IProps> = ({ info, setInfo }) => {
  const { t } = useTranslation();
  return (
    <>
      <form action="" className="flex-1 flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-4">
          <InputComponent
            value={info.firstName}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                firstName: newValue,
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
                lastName: newValue,
              }))
            }
            placeholder={t("account.LastName")}
            label={t("account.LastName")}
          />
        </div>
        <InputComponent
          value={info.companyName}
          setValue={(newValue: string) =>
            setInfo((prevInfo) => ({
              ...prevInfo,
              companyName: newValue,
            }))
          }
          placeholder={t("account.CompanyName")}
          label={`${t("account.CompanyName")} (${t("optional")})`}
        />
        <div>
          <InputComponent
            value={info.streetAddress}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                streetAddress: newValue,
              }))
            }
            placeholder={t("account.CityAddress")}
            label={t("account.CityAddress")}
          />
        </div>
        <div>
          <InputComponent
            type="email"
            value={info.email}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                email: newValue,
              }))
            }
            placeholder="Email"
            label="Email"
          />
        </div>
        <div>
          <InputComponent
            value={info.phone}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                phone: newValue,
              }))
            }
            placeholder={t("account.PhoneNumber")}
            label={t("account.PhoneNumber")}
            type="tel"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-5">
            {t("account.AdditionalInfo")}
          </h3>
          <TextareaComponent
            value={info.additionalInfo}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                additionalInfo: newValue,
              }))
            }
            placeholder={t("NotesDelivery")}
            label={`${t("account.OrderNotes")} (${t("optional")})`}
          />
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
