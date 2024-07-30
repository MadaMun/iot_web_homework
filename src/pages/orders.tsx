import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Order, Drink } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const { data: orders, error: ordersError } = useSWR<Order[]>("/orders");
  const { data: drinks, error: drinksError } = useSWR<Drink[]>("/drinks");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">คำสั่งซื้อ</h1>
          <h2>รายการคำสั่งซื้อทั้งหมด</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการคำสั่งซื้อ</h1>
          </div>

          {!orders && !ordersError && <Loading />}
          {(ordersError || drinksError) && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {(ordersError || drinksError)?.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {orders?.map((order) => {
              const drink = drinks?.find((d) => d.id === order.drink_id);
              return (
                <div className="border border-solid border-neutral-200" key={order.id}>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold line-clamp-2">Order ID: {order.id}</h2>
                    {drink && (
                      <>
                        <p className="text-xs text-neutral-500">Drink: {drink.menu}</p>
                        <p className="text-xs text-neutral-500">Price: {drink.prics}</p>
                      </>
                    )}
                    <p className="text-xs text-neutral-500">Quantity: {order.much}</p>
                    <p className="text-xs text-neutral-500">Note: {order.note}</p>
                  </div>

                  <div className="flex justify-end px-4 pb-2">
                    
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}

