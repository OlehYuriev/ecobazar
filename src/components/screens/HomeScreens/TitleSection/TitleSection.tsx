import LinkComponent from "@/components/ui/link/LinkComponent";
import { FC } from "react";
interface IProps {
  title: string;
}
const TitleSection: FC<IProps> = ({ title }) => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-3xl">{title}</h2>
        <LinkComponent name="View All" />
      </div>
    </>
  );
};

export default TitleSection;
