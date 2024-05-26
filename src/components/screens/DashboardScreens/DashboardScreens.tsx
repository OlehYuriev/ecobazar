import useAuth from "@/hooks/useAuth";

import { FC } from "react";

const DashboardScreens: FC = () => {
  const authUser = useAuth();
  console.log(authUser);

  return (
    <>
      {/*       <section>
        <div>
          <div>{authUser?.metadata.creationTime}</div>
          <div></div>
        </div>
      </section> */}
    </>
  );
};

export default DashboardScreens;
