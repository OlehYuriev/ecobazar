import { FC } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "./TeamComponent.module.scss";
import { useTranslation } from "react-i18next";

const TeamComponent: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <h2 className="text-center font-semibold text-4xl">
            {t("team.OurTeam")}
          </h2>
          <div className={styles.cards}>
            <PhotoCard
              name={t("team.JennyWilson")}
              profession={t("team.CeoFounder")}
              img="founder"
            />
            <PhotoCard
              name={t("team.JaneCooper")}
              profession={t("team.Worker")}
              img="worker"
            />
            <PhotoCard
              name={t("team.CodyFisher")}
              profession={t("team.SecurityGuard")}
              img="security"
            />
            <PhotoCard
              name={t("team.RobertFox")}
              profession={t("team.SeniorFarmerManager")}
              img="farmer"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamComponent;
