import { FC } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { BsBagCheck } from "react-icons/bs";
import { PiPackage } from "react-icons/pi";

const InfoShop: FC = () => {
  const info = [
    {
      icon: <TbTruckDelivery />,
      title: "Free Shipping",
      description: "Free shipping on all your order",
    },
    {
      icon: <BsHeadset />,
      title: "Customer Support 24/7",
      description: "Instant access to Support",
    },
    {
      icon: <BsBagCheck />,
      title: "100% Secure Payment",
      description: "We ensure your money is save",
    },
    {
      icon: <PiPackage />,
      title: "Money-Back Guarantee",
      description: "30 Days Money-Back Guarantee",
    },
  ];
  return (
    <>
      <section className="mt-6">
        <div className="container">
          <div className="bg-white shadow-info py-10 rounded-lg">
            <ol className="flex justify-around">
              {info.map((item) => {
                return (
                  <li key={item.title} className="flex px-2 ">
                    <div className="text-branding-success text-4xl mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-balance">
                        {item.title}
                      </h4>
                      <p className="text-gray-scale-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoShop;
