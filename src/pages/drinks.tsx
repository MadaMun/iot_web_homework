import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Drink } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function  DrinkPage() {
  const { data: drink, error } = useSWR<Drink[]>("/drinks");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">Menu</h1>
          <h2>Drinks Menu</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการเครื่องดื่ม</h1>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/drinks/create"
              size="xs"
              variant="primary"
              className="flex items-center space-x-2"
            >
              เพิ่มเมนู
            </Button>
          </div>

          {!drink && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {drink?.map((drink) => (
              <div className="border border-solid border-neutral-200" key={drink.id}>
                <img
                  src={`https://placehold.co/400x300?text=${encodeURIComponent(drink.menu)}`}
                  alt={drink.menu}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-2">{drink.menu}</h2>
                  <p className="text-xs text-neutral-500">โดย {drink.prics}</p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  <Button
                  component={Link}
                  to={`/drinks/${drink.id}`}
                  size="xs" variant="default">
                    สั่งเครื่องดื่ม
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
