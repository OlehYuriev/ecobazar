import { FC } from "react";
import AccountSetting from "./AccountSetting";
import ChangePassword from "./ChangePassword";
import BillingAddress from "./BillingAddress";

const SettingScreens: FC = () => {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <AccountSetting />
        <BillingAddress />
        <ChangePassword />
      </div>
    </>
  );
};

export default SettingScreens;
