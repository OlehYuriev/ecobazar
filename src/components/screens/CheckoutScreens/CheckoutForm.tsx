import { FC, useState } from "react";
import InputComponent from "@/components/ui/input/InputComponent";
import TextareaComponent from "@/components/ui/textarea/TextareaComponent";

const CheckoutForm: FC = () => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });
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
            placeholder="Your first name"
            label="First name"
          />

          <InputComponent
            value={info.lastName}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                lastName: newValue,
              }))
            }
            placeholder="Your last name"
            label="Last name"
          />
          <InputComponent
            value={info.lastName}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                lastName: newValue,
              }))
            }
            placeholder="Company Name"
            label="Company Name (optional)"
          />
        </div>
        <div>
          <InputComponent
            value={info.streetAddress}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                streetAddress: newValue,
              }))
            }
            placeholder="Street Address"
            label="Street Address"
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
            placeholder="Email Address"
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
            placeholder="Phone number"
            label="Phone"
            type="tel"
          />
        </div>
        <div>
          <h3 className="text-2xl font-medium mb-5">Additional Info</h3>
          <TextareaComponent
            value={info.additionalInfo}
            setValue={(newValue: string) =>
              setInfo((prevInfo) => ({
                ...prevInfo,
                additionalInfo: newValue,
              }))
            }
            placeholder="Notes about your order, e.g. special notes for delivery"
            label="Order Notes (Optional)"
          />
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
