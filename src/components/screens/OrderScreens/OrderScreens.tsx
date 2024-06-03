import { useEffect, useState } from "react";
import TableOrders from "@/components/table/TableOrders";
import useAuth from "@/hooks/useAuth";
import { ref as databaseRef, onValue } from "firebase/database";
import { database } from "@/firebase";
import IProductOrder from "@/interface/IProductOrder";
import PaginationPage from "@/components/pagination/PaginationPage";
import useParamsPage from "@/hooks/useParamsPage";

const OrderScreens = () => {
  const authUser = useAuth();
  const [ordersArray, setOrdersArray] = useState<IProductOrder[] | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const { searchParams, setPage } = useParamsPage();

  const itemsPerPage = 4; // Количество элементов на странице
  // Вычисляем общее количество страниц
  const totalPages = ordersArray
    ? Math.ceil(ordersArray.length / itemsPerPage)
    : 0;

  // Получаем под массив элементов для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = ordersArray
    ? ordersArray.slice(startIndex, endIndex)
    : [];

  useEffect(() => {
    if (authUser) {
      const productsRef = databaseRef(database, "products/" + authUser.uid);
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const ordersArray: IProductOrder[] = Object.values(data);
          const reverseArray = ordersArray.reverse();
          setOrdersArray(reverseArray);
        } else {
          setOrdersArray(null);
        }
      });
    }
  }, [authUser]);

  return (
    <>
      {" "}
      <div className="border border-gray-scale-gray-100 rounded-lg mt-6  pb-9">
        <div className="py-4 px-6">
          <h3 className="text-xl font-medium">Order History</h3>
        </div>
        {ordersArray && ordersArray.length ? (
          <>
            <div className="overflow-auto">
              <TableOrders tableArray={currentOrders} />
            </div>
            {ordersArray.length > itemsPerPage && (
              <PaginationPage
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setFilter={setPage}
                searchParams={searchParams}
                totalPages={totalPages}
              />
            )}
          </>
        ) : (
          <h5 className="text-center font-semibold text-branding-warning text-3xl">
            No orders
          </h5>
        )}
      </div>
    </>
  );
};
export default OrderScreens;
