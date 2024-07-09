import LinkComponent from "@/components/ui/link/LinkComponent";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
}
const TitleSection: FC<IProps> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-3xl mr-2">{title}</h2>
        <LinkComponent name={t("links.ViewAll")} />
      </div>
    </>
  );
};

export default TitleSection;
